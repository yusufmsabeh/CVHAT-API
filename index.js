import express from "express";
import expressConfig from "./config/expressConfig.js";
import routesConfig from "./routes/index.js";
import connection from "./database/connection.js";
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
connection()
  .authenticate()
  .then(() => {
    connection()
      .sync({ alter: true })
      .then(() => {
        app.listen(PORT, HOST, () => {
          console.log("Server is running on port", PORT, " host: ", HOST);
        });
      });
  });
