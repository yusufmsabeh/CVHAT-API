import express from "express";
import expressConfig from "./config/expressConfig.js";
import routesConfig from "./routes/index.js";
import connection from "./database/connection.js";
import s3Client from "./config/s3Client.js";
import { checkAzureConnection } from "./config/azure_config.js";
// Defining Relations
import * as index from "./models/index.js";

const app = express();
// Configure express
expressConfig(app);
// Configure routes
routesConfig(app);

// Starting server
const PORT = process.env.PORT || 3000;
const HOST = process.env.SERVER_HOST || "localhost";

checkAzureConnection().then(() => {
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
