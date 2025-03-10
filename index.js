import express from "express";
import expressConfig from "./config/expressConfig.js";
import routesConfig from "./routes/index.js";
import connection from "./database/connection.js";
import s3Client from "./config/s3Client.js";
// Defining Relations
import * as index from "./models/index.js";

const app = express();
// Configure express
expressConfig(app);
// Configure routes
routesConfig(app);

// Starting server
const PORT = process.env.SERVER_PORT || 3000;
const HOST = process.env.SERVER_HOST || "localhost";

s3Client
  .listBuckets()
  .promise()
  .then((data) => {
    const bucket = data.Buckets.filter(
      (bucket) => bucket.Name === process.env.AWS_S3_BUCKET_NAME,
    )[0];
    if (!bucket) {
      s3Client
        .createBucket({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
        })
        .promise()
        .catch((error) => {
          console.error(error);
          process.exit(1);
        })
        .catch(console.error);
    }
    connection()
      .authenticate()
      .then(() => {
        connection()
          .sync()
          .then(() => {
            app.listen(PORT, HOST, () => {
              console.log("Server is running on port", PORT, " host: ", HOST);
            });
          });
      });
  });
