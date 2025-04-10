import cors from "cors";
import bodyParser from "express";
import logger from "../middlewares/logger.js";
export default function (app) {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(logger);
}
