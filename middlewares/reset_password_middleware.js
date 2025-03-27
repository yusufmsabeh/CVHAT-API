import {
  errorResponse,
  serverSideErrorResponse,
  unAuthorizedResponse,
} from "../services/response_handler.js";
import ResetPasswordToken from "../models/ResetPasswordToken.js";

export default async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    const model = req.model;
    if (!token)
      return errorResponse(res, 401, "No reset password token provided");
    const resetPasswordToken = await ResetPasswordToken.findOne({
      where: {
        token_id: token,
      },
    });
    if (!resetPasswordToken)
      return unAuthorizedResponse(res, 401, "Invalid token");
    const now = new Date();
    const expiresAt = new Date(resetPasswordToken.expiresAt);
    if (now > expiresAt) {
      await resetPasswordToken.destroy();
      return errorResponse(res, 403, "Reset password token expired");
    }
    const user = await model.findByPk(resetPasswordToken.user_id);
    if (!user) return unAuthorizedResponse(res, 401, "Invalid token");
    req.model = user;
    return next();
  } catch (e) {
    serverSideErrorResponse(res, e);
  }
};
