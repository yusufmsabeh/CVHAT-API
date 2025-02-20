import testRouter from "./test.js";

export default function (app) {
  app.use("/test", testRouter);
}
