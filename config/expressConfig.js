import cors from "cors";
import bodyParser from "express";
import logger from "../controllers/logger.js";
export default function (app) {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(logger);
}
