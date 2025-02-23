import { Router } from "express";
import { postLogin, postSignup } from "../../controllers/user/auth.js";
import { checkSchema } from "express-validator";
import postSignupSchema from "../../validation/signup_validation_schema.js";
import postLoginSchema from "../../validation/login_validation_schema.js";
const router = new Router();
router.post("/signup", checkSchema(postSignupSchema), postSignup);
router.post("/login", checkSchema(postLoginSchema), postLogin);
export default router;
