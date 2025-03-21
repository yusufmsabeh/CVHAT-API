const sendResponse = (res, status, code, message, data = {}) => {
  try {
    if (!Array.isArray(message)) message = [message];
    res.status(code).json({ status, code, message, data });
  } catch (error) {
    console.log("Response error: " + error);
  }
};

export const successResponse = (res, code, message, data) =>
  sendResponse(res, "success", code, message, data);

export const errorResponse = (res, code, message, data) =>
  sendResponse(res, "error", code, message, data);

export const unAuthorizedResponse = (res, code, message, data) =>
  sendResponse(res, "unAuthorized", code, message, data);

export const serverSideErrorResponse = (res, error) => {
  console.log(error);
  sendResponse(res, "error", 500, "Something went wrong");
};
