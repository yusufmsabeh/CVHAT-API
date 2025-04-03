import { Router } from "express";
import {
  AIReview,
  getReviewByID,
  getReviews,
  getReviewsCount,
  postToggleFavorites,
  getFavorites,
} from "../../controllers/user/review.js";
import { checkSchema } from "express-validator";
import postReviewSchema from "../../validation/post_review_validation_schema.js";
import validateRequest from "../../middlewares/validate_request_middleware.js";
import sessionMiddleware from "../../middlewares/session_middleware.js";
const router = Router();
router.get("/", sessionMiddleware, getReviews);
router.get("/count", sessionMiddleware, getReviewsCount);
router.post("/toggle-favorites/:id", sessionMiddleware, postToggleFavorites);
router.get("/favorites", sessionMiddleware, getFavorites);
router.get("/:id", sessionMiddleware, getReviewByID);
router.post(
  "/ai",
  sessionMiddleware,
  checkSchema(postReviewSchema),
  validateRequest,
  AIReview,
);
export default router;
