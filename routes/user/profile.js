import { Router } from "express";
import {
  getProfile,
  postProfile,
  postPassword,
  postAvatar,
} from "../../controllers/user/profile.js";
import sessionMiddleware from "../../middlewares/session_middleware.js";
import Session from "../../models/Session.js"
import { checkSchema } from "express-validator";
import updateProfileSchema from "../../validation/update_profile_validation_schema.js";
import validateRequest from "../../middlewares/validate_request_middleware.js";
import updatePasswordSchema from "../../validation/update_password_validation_schema.js";
import multer from "multer";
import multerConfig from "../../config/multer_config.js";
const router = new Router();

router.get("/", sessionMiddleware(Session), getProfile);
router.post(
  "/",
  sessionMiddleware(Session),
  checkSchema(updateProfileSchema),
  validateRequest,
  postProfile,
);
router.post(
  "/password",
  sessionMiddleware(Session),
  checkSchema(updatePasswordSchema),
  validateRequest,
  postPassword,
);
const upload = multer(multerConfig);
router.post("/avatar", sessionMiddleware(Session), upload.single("avatar"), postAvatar);
export default router;
