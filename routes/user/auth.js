import { Router } from "express";
import { postSignup } from "../../controllers/user/auth.js";
import { checkSchema } from "express-validator";
import postSignupSchema from "../../validation/signup_validation_schema.js";
const router = new Router();
router.post("/signup", checkSchema(postSignupSchema), postSignup);
export default router;
