import { errorResponse } from "./response_handler.js";
import { validationResult } from "express-validator";

export default (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errorResponse(
      res,
      400,
      errors.array().map((error) => error.msg),
    );
    return true;
  }
};
