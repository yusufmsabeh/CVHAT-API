import { Router } from "express";
import auth from "./auth.js";
import cv from "./cv.js";
const router = new Router();
router.use("/auth", auth);
router.use("/cv", cv);
export default router;
