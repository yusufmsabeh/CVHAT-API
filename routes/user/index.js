import { Router } from "express";
import auth from "./auth.js";
import cv from "./cv.js";
import review from "./review.js";
const router = new Router();
router.use("/auth", auth);
router.use("/cv", cv);
router.use("/review", review);
export default router;
