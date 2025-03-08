import { Router } from "express";
import multer from "multer";
import { postCV, validateCV } from "../../controllers/user/cv.js";
import multerConfig from "../../config/multer_config.js";
import sessionMiddleware from "../../middlewares/session_middleware.js";
import attachModel from "../../middlewares/attach_models.js";
import User from "../../models/User.js";
import createBuketMiddleware from "../../middlewares/creat_bucket_middleware.js";
const upload = multer(multerConfig);
const router = new Router();
router.use(sessionMiddleware);
router.post(
  "/",
  upload.single("cv"),
  validateCV,
  createBuketMiddleware,
  postCV,
);
export default router;
