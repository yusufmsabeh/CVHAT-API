import {
  errorResponse,
  serverSideErrorResponse,
  successResponse,
} from "../../services/response_handler.js";
import { pdf } from "pdf-to-img";
import pdfParse from "pdf-parse";
import crypto from "crypto";
import validateFile from "../../services/validate_file.js";
import { uploadToAzure } from "../../helpers/azure.js";
export const postCV = async (req, res) => {
  try {
    let cv = req.file;
    const userID = req.model.ID;
    const fileValidationRequest = validateFile(cv, ["application/pdf"]);
    if (!fileValidationRequest.status)
      return errorResponse(res, 400, fileValidationRequest.message);
    const cvName = `${userID}-${Date.now()}-cv`;
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
      content: content.text,
      fileName: cv.originalname,
    });
    req.file=null;
    successResponse(res, 200, "CV uploaded Successfully", {
      cv: {
        ID: cvModel.ID,
        url: cvModel.url,
        fileName: cvModel.fileName,
        createdAt: cvModel.createdAt,
      },
    });
    // upload High Quality Image
    const imageHighQuality = await (
      await pdf(cv.buffer, { scale: 1 })
    ).getPage(1);
    const imageHighQualityName = `${crypto.randomUUID()}-high-cover`;
    const imageHighQualityLink = await uploadToAzure(
      imageHighQuality.buffer,
      imageHighQualityName,
      folderName,
      "image/png",
      imageHighQuality.buffer.byteLength,
      userID,
    );
    // upload Low Quality Image
    const imageLowQuality = await (
      await pdf(cv.buffer, { scale: 0.3 })
    ).getPage(1);
    const imageLowQualityName = `${crypto.randomUUID()}-low-cover`;
    const imageLowQualityLink = await uploadToAzure(
      imageLowQuality.buffer,
      imageLowQualityName,
      folderName,
      "image/png",
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
