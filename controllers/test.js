import {
  serverSideErrorResponse,
  successResponse,
} from "../services/response_handler.js";

export const getTest = (req, res) => {
  try {
    return successResponse(res, 200, "server is running");
  } catch (error) {
    return serverSideErrorResponse(res, error);
  }
};
