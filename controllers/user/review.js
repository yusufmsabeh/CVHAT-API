import {
  errorResponse,
  serverSideErrorResponse,
  successResponse,
} from "../../services/response_handler.js";
import CV from "../../models/CV.js";
import s3Client from "../../config/s3Client.js";
import pdf from "pdf-parse";
import { reviewCV } from "../../services/openAI_service.js";
import Review from "../../models/Review.js";
import Comment from "../../models/Comment.js";
import getCommentResource from "../../resources/get_comment_resource.js";
export const AIReview = async (req, res, next) => {
  try {
    const user = req.model;
    const hasCV = await user.hasCV(req.body.cv);
    if (!hasCV) return errorResponse(res, 404, "No CV found");

    const cv = await CV.findByPk(req.body.cv);
    const review = await user.createReview({
      isAI: true,
      CV_ID: cv.ID,
    });
    const cvObject = await s3Client
      .getObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${user.ID}/${cv.key}`,
      })
      .promise();
    const pdfFile = await pdf(cvObject.Body);
    const comments = (await reviewCV(pdfFile)).comments;
    for (const comment of comments) {
      await review.createComment({
        title: comment.title,
        description: comment.comment,
      });
    }
    const reviewModel = await Review.findByPk(7, {
      ...getCommentResource,
    });
    successResponse(res, 200, "CV reviewed successfully.", {
      review: reviewModel,
    });
  } catch (error) {
    serverSideErrorResponse(res, error);
  }
};
