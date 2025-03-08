import { errorResponse } from "../services/response_handler.js";
import s3Client from "../config/s3Client.js";

export default async (req, res, next) => {
  try {
    await s3Client
      .putObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: req.model.ID.toString(),
      })
      .promise();
    next();
  } catch (error) {
    errorResponse(res, error);
  }
};
