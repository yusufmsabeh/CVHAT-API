import {
  errorResponse,
  serverSideErrorResponse,
  successResponse,
} from "../../services/response_handler.js";
import CV from "../../models/CV.js";
import pdf from "pdf-parse";
import { reviewCV } from "../../services/openAI_service.js";
import Review from "../../models/Review.js";
import getReviewResource from "../../resources/get_review_resource.js";
import getReviewsResource from "../../resources/get_reviews_resource.js";
import { containerClient } from "../../config/azure_config.js";

export const AIReview = async (req, res, next) => {
  try {
    const user = req.model;
    const cv = (
      await user.getCVs({
        where: {
          ID: req.body.cv,
        },
      })
    )[0];
    if (!cv) return errorResponse(res, 404, "No CV found");

    const review = await user.createReview({
      isAI: true,
      CV_ID: cv.ID,
    });
    const comments = (await reviewCV(cv.content)).comments;
    for (const comment of comments) {
      await review.createComment({
        title: comment.title,
        description: comment.comment,
      });
    }
    const reviewModel = await Review.findByPk(review.ID, {
      ...getReviewResource,
    });
    successResponse(res, 200, "CV reviewed successfully.", {
      review: reviewModel,
    });
  } catch (error) {
    serverSideErrorResponse(res, error);
  }
};
export const getReviews = async (req, res, next) => {
  try {
    const user = req.model;
    const filter = (req.query.filter || "").toLowerCase();
    const options = {};

    if (filter === "recent") options.limit = 3;
    if (filter === "ai") options.where = { isAI: true };
    const reviews = await user.getReviews({
      ...getReviewsResource,
      ...options,
    });
    successResponse(res, 200, "Reviews retrieved successfully.", {
      reviews: reviews,
    });
  } catch (error) {
    serverSideErrorResponse(res, error);
  }
};
export const getReviewByID = async (req, res, next) => {
  try {
    const user = req.model;
    const reviewID = req.params.id;
    const review = await user.getReviews({
      where: { ID: reviewID },
      ...getReviewResource,
    });
    successResponse(res, 200, "Review reviewed successfully.", {
      review: review,
    });
  } catch (error) {
    serverSideErrorResponse(res, error);
  }
};

export const getReviewsCount = async (req, res, next) => {
  try {
    const user = req.model;
    const recruiterReviewCount = await user.countReviews({
      where: {
        isAI: false,
      },
    });

    const AIReviewCount = await user.countReviews({
      where: {
        isAI: true,
      },
    });
    successResponse(res, 200, "Review counts retrieved successfully.", {
      aiReviewCount: AIReviewCount,
      recruiterReviewCount: recruiterReviewCount,
    });
  } catch (error) {
    serverSideErrorResponse(res, error);
  }
};
export const postToggleFavorites = async (req, res, next) => {
  try {
    const user = req.model;
    const reviewID = req.params.id;
    const review = (
      await user.getReviews({
        where: {
          ID: reviewID,
        },
        ...getReviewsResource,
      })
    )[0];
    if (!review) return errorResponse(res, 404, "No review found");
    review.isFavorite = !review.isFavorite;
    await review.save();
    delete review.dataValues.updatedAt;
    const message = review.isFavorite
      ? "Added to Favorites"
      : "Removed from Favorites";
    successResponse(res, 200, message, { review });
  } catch (error) {
    serverSideErrorResponse(res, error);
  }
};

export const getFavorites = async (req, res, next) => {
  try {
    const user = req.model;
    const reviews = await user.getReviews({
      where: {
        isFavorite: true,
      },
      ...getReviewsResource,
    });
    successResponse(res, 200, "Favorites retrieved successfully.", {
      reviews: reviews,
    });
  } catch (error) {
    serverSideErrorResponse(res, error);
  }
};

const downloadCv = async (cvName) => {
  const blobClient = containerClient.getBlockBlobClient(cvName);
  const stream = (await blobClient.download(0)).readableStreamBody;
  return await streamToBuffer(stream);
};
const streamToBuffer = async (readableStream) => {
  const chunks = [];
  for await (const chunk of readableStream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
};
