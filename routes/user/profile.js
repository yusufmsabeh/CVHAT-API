import { Router } from "express";
import { getProfile, postProfile } from "../../controllers/user/profile.js";
import sessionMiddleware from "../../middlewares/session_middleware.js";
import { checkSchema } from "express-validator";
import updateProfileSchema from "../../validation/update_profile_validation_schema.js";
import validateRequest from "../../middlewares/validate_request_middleware.js";
const router = new Router();
router.use(sessionMiddleware);
router.get("/", getProfile);
router.post(
  "/",
  checkSchema(updateProfileSchema),
  validateRequest,
  postProfile,
);
export default router;
