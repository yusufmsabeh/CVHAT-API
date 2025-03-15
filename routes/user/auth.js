import { Router } from "express";
import {
  postLogin,
  postSignup,
  postLogout,
} from "../../controllers/user/auth.js";
import { checkSchema } from "express-validator";
import postSignupSchema from "../../validation/signup_validation_schema.js";
import postLoginSchema from "../../validation/login_validation_schema.js";
import sessionMiddleware from "../../middlewares/session_middleware.js";
import validateRequest from "../../middlewares/validate_request_middleware.js";
const router = new Router();
router.post(
  "/signup",
  checkSchema(postSignupSchema),
  validateRequest,
  postSignup,
);
router.post("/login", checkSchema(postLoginSchema), validateRequest, postLogin);
// router.use(sessionMiddleware);
router.post("/logout", postLogout);
export default router;
