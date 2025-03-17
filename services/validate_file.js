import { errorResponse, serverSideErrorResponse } from "./response_handler.js";

export default (file, fileTypes) => {
  try {
    if (!file)
      return {
        status: false,
        message: "File is required",
      };

    let { mimetype } = file;
    if (!fileTypes.includes(mimetype)) {
      return {
        status: false,
        message: "invalid file type",
      };
    }
    return { status: true };
  } catch (error) {
    throw error;
  }
};
