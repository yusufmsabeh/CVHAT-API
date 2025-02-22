import cors from "cors";
import bodyParser from "express";
export default function (app) {
  app.use(cors());
  app.use(bodyParser.json());
}
