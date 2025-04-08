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
import Session from "../../models/Session.js"
const router = Router();
router.get("/", sessionMiddleware(Session), getReviews);
router.get("/count", sessionMiddleware(Session), getReviewsCount);
router.post("/toggle-favorites/:id", sessionMiddleware(Session), postToggleFavorites);
router.get("/favorites", sessionMiddleware(Session), getFavorites);
router.get("/:id", sessionMiddleware(Session), getReviewByID);
router.post(
  "/ai",
  sessionMiddleware(Session),
  checkSchema(postReviewSchema),
  validateRequest,
  AIReview,
);
export default router;
