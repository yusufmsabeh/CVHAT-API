import { Router } from "express";
import multer from "multer";
import { postCV } from "../../controllers/user/cv.js";
import multerConfig from "../../config/multer_config.js";
import sessionMiddleware from "../../middlewares/session_middleware.js";
import Session from "../../models/Session.js"
const upload = multer(multerConfig);
const router = new Router();
router.post("/", sessionMiddleware(Session), upload.single("cv"), postCV);
export default router;
