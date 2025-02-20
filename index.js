import express from "express";
import expressConfig from "./config/expressConfig.js";
import routesConfig from "./routes/index.js";
const app = express();
// Configure express
expressConfig(app);
// Configure routes
routesConfig(app);

// Starting server
const PORT = process.env.SERVER_PORT || 3000;
const HOST = process.env.SERVER_HOST || "localhost";

app.listen(PORT, HOST, () => {
  console.log("Server is running on port", PORT, " host: ", HOST);
});
