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
import validate_request from "../../services/validate_request.js";
const router = new Router();
router.post(
  "/signup",
  checkSchema(postSignupSchema),
  validate_request,
  postSignup,
);
router.post(
  "/login",
  checkSchema(postLoginSchema),
  validate_request,
  postLogin,
);
router.use(sessionMiddleware);
router.post("/logout", postLogout);
export default router;
