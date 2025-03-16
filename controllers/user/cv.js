import {
  errorResponse,
  serverSideErrorResponse,
  successResponse,
} from "../../services/response_handler.js";
import { pdf } from "pdf-to-img";
import pdfParse from "pdf-parse";
import crypto from "crypto";
import { containerClient } from "../../config/azure_config.js";
export const postCV = async (req, res) => {
  try {
    let cv = req.file;
    const userID = req.model.ID;
    const cvName = `${userID}-${Date.now()}-${cv.originalname}.pdf`;
    const folderName = crypto.randomUUID();
    const pdfLink = await uploadToAzure(
      cv.buffer,
      cvName,
      folderName,
      "application/pdf",
      cv.buffer.length,
      userID,
    );
    const content = await pdfParse(cv.buffer);
    const cvModel = await req.model.createCV({
      url: pdfLink,
      key: cvName,
      folderName: folderName,
      title: req.body.title,
      content: content.text,
      fileName: cv.originalname,
    });
    successResponse(res, 200, "CV uploaded Successfully", { cvModel });
    // upload High Quality Image
    const imageHighQuality = await (
      await pdf(cv.buffer, { scale: 1 })
    ).getPage(1);
    const imageHighQualityName = `${crypto.randomUUID()}.png`;
    const imageHighQualityLink = await uploadToAzure(
      imageHighQuality.buffer,
      imageHighQualityName,
      folderName,
      "application/png",
      imageHighQuality.buffer.byteLength,
      userID,
    );
    // upload Low Quality Image
    const imageLowQuality = await (
      await pdf(cv.buffer, { scale: 0.3 })
    ).getPage(1);
    const imageLowQualityName = `${crypto.randomUUID()}.png`;
    const imageLowQualityLink = await uploadToAzure(
      imageLowQuality.buffer,
      imageLowQualityName,
      folderName,
      "application/png",
      imageLowQuality.buffer.byteLength,

      userID,
    );
    cvModel.coverImageUrlLow = imageLowQualityLink;
    cvModel.coverImageUrlHigh = imageHighQualityLink;
    await cvModel.save();
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

async function uploadToAzure(
  file,
  fileName,
  folderName,
  fileType,
  fileLength,
  userID,
) {
  const blockBlobClient = containerClient.getBlockBlobClient(
    `${userID}/${folderName}/${fileName}`,
  );
  await blockBlobClient.upload(file, fileLength, {
    blobHTTPHeaders: {
      blobContentType: fileType,
    },
  });
  return blockBlobClient.url;
}
