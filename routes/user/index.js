import { Router } from "express";
import auth from "./auth.js";
const router = new Router();
router.use("/auth", auth);
export default router;
