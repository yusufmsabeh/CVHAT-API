import { Router } from "express";
import {
  postLogin,
  postSignup,
  postLogout,
  postSendOTP,
  postVerifyOTP,
  postResetPassword,
} from "../../controllers/user/auth.js";
import { checkSchema } from "express-validator";
import postSignupSchema from "../../validation/signup_validation_schema.js";
import postLoginSchema from "../../validation/login_validation_schema.js";
import sessionMiddleware from "../../middlewares/session_middleware.js";
import validateRequest from "../../middlewares/validate_request_middleware.js";
import sendOTPSchema from "../../validation/send_otp_schema.js";
import verifyOTPSchema from "../../validation/verify_otp_schema.js";
import resetPasswordMiddleware from "../../middlewares/reset_password_middleware.js";
import resetPasswordValidationSchema from "../../validation/reset_password_validation_schema.js";
const router = new Router();
router.post(
  "/signup",
  checkSchema(postSignupSchema),
  validateRequest,
  postSignup,
);
router.post("/login", checkSchema(postLoginSchema), validateRequest, postLogin);
router.post(
  "/send-otp",
  checkSchema(sendOTPSchema),
  validateRequest,
  postSendOTP,
);
router.post(
  "/verify-otp",
  checkSchema(verifyOTPSchema),
  validateRequest,
  postVerifyOTP,
);
router.post(
  "/reset-password",
  resetPasswordMiddleware,
  checkSchema(resetPasswordValidationSchema),
  validateRequest,
  postResetPassword,
);
router.post("/logout", sessionMiddleware, postLogout);
export default router;
