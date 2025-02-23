import testRouter from "./test.js";
import userRouter from "./user/index.js";
import attach_models from "../middlewares/attach_models.js";
import User from "../models/User.js";
export default function (app) {
  app.use("/test", testRouter);
  app.use("/user", attach_models(User), userRouter);
}
