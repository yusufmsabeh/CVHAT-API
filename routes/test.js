import { Router } from "express";
import { getTest } from "../controllers/test.js";

const router = new Router();
router.get("/", getTest);
export default router;
