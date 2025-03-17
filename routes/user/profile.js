import { Router } from "express";
import {
  getProfile,
  postProfile,
  postPassword,
} from "../../controllers/user/profile.js";
import sessionMiddleware from "../../middlewares/session_middleware.js";
import { checkSchema } from "express-validator";
import updateProfileSchema from "../../validation/update_profile_validation_schema.js";
import validateRequest from "../../middlewares/validate_request_middleware.js";
import updatePasswordSchema from "../../validation/update_password_validation_schema.js";
const router = new Router();
router.use(sessionMiddleware);
router.get("/", getProfile);
router.post(
  "/",
  checkSchema(updateProfileSchema),
  validateRequest,
  postProfile,
);
router.post(
  "/password",
  checkSchema(updatePasswordSchema),
  validateRequest,
  postPassword,
);
export default router;
