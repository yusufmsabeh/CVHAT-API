import { Router } from "express";
import {
  AIReview,
  getReviewByID,
  getReviews,
  getReviewsCount,
  postToggleFavorites,
} from "../../controllers/user/review.js";
import { checkSchema } from "express-validator";
import postReviewSchema from "../../validation/post_review_validation_schema.js";
import validateRequest from "../../middlewares/validate_request_middleware.js";
import sessionMiddleware from "../../middlewares/session_middleware.js";
const router = Router();
router.use(sessionMiddleware);
router.get("/", getReviews);
router.get("/count", getReviewsCount);
router.post("/toggle-favorites/:id", postToggleFavorites);
router.get("/:id", getReviewByID);
router.post("/ai", checkSchema(postReviewSchema), validateRequest, AIReview);
export default router;
