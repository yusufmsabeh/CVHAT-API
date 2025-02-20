import dotenv from "dotenv";
import cors from "cors";
export default function (app) {
  dotenv.config();
  app.use(cors());
}
