import {
  serverSideErrorResponse,
  successResponse,
} from "../services/response_handler.js";

export const getTest = (req, res) => {
  try {
    res.set({
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      "Surrogate-Control": "no-store",
    });
    return successResponse(res, 200, "server is running");
  } catch (error) {
    return serverSideErrorResponse(res, error);
  }
};
