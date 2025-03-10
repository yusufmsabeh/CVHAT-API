import {
  errorResponse,
  serverSideErrorResponse,
  successResponse,
} from "../../services/response_handler.js";
import S3Client from "../../config/s3Client.js";
import { pdf } from "pdf-to-img";
import crypto from "crypto";
import getCvResources from "../../resources/get_cv_resource.js";
export const postCV = async (req, res) => {
  try {
    let cv = req.file;
    const userID = req.model.ID;
    const cvName = `${userID}-${Date.now()}-${cv.originalname}.pdf`;
    await uploadCVtoS3(cv, cvName, userID);
    const imageHighQuality = await (
      await pdf(cv.buffer, { scale: 1 })
    ).getPage(1);
    const imageLowQuality = await (
      await pdf(cv.buffer, { scale: 0.3 })
    ).getPage(1);
    const imageHighQualityName = `${crypto.randomUUID()}.png`;
    const imageLowQualityName = `${crypto.randomUUID()}.png`;
    await uploadImageToS3(imageHighQuality, imageHighQualityName, userID);
    await uploadImageToS3(imageLowQuality, imageLowQualityName, userID);
    const pdfLink = encodeURI(
      `http://localhost.localstack.cloud:4566/${process.env.AWS_S3_BUCKET_NAME}/${userID}/${cvName}`,
    );
    const imageHighQualityLink = encodeURI(
      `http://localhost.localstack.cloud:4566/${process.env.AWS_S3_BUCKET_NAME}/${userID}/${imageHighQualityName}`,
    );
    const imageLowQualityLink = encodeURI(
      `http://localhost.localstack.cloud:4566/${process.env.AWS_S3_BUCKET_NAME}/${userID}/${imageLowQualityName}`,
    );
    cv = await req.model.createCV(
      {
        url: pdfLink,
        key: cvName,
        coverImageUrlHigh: imageHighQualityLink,
        coverImageUrlLow: imageLowQualityLink,
      },
      { ...getCvResources },
    );
    successResponse(res, 200, "CV uploaded successfully", {
      cv: cv,
    });
  } catch (error) {
    serverSideErrorResponse(res, error);
  }
};

export const validateCV = async (req, res, next) => {
  try {
    const cv = req.file;
    if (!cv) return errorResponse(res, 400, "CV file is required");

    let { mimetype } = cv;
    if (mimetype !== "application/pdf") {
      return errorResponse(res, 400, "Invalid file type");
    }

    next();
  } catch (error) {
    serverSideErrorResponse(res, error);
  }
};

async function uploadCVtoS3(cv, cvName, userID) {
  await S3Client.putObject({
    Bucket: `${process.env.AWS_S3_BUCKET_NAME}/${userID}`,
    Key: cvName,
    Body: cv.buffer,
    ContentType: "application/pdf",
  }).promise();
}
async function uploadImageToS3(image, imageName, userID) {
  await S3Client.putObject({
    Bucket: `${process.env.AWS_S3_BUCKET_NAME}/${userID}`,
    Key: imageName,
    Body: image,
    ContentType: "application/png",
  }).promise();
}
