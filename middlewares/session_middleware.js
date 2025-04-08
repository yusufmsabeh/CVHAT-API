import {
  errorResponse,
  serverSideErrorResponse,
  unAuthorizedResponse,
} from "../services/response_handler.js";

export default (sessionModel) => async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    const model = req.model;
    if (!token) return errorResponse(res, 401, "No token provided");
    const tokenModel = await sessionModel.findOne({
      where: {
        token: token,
      },
    });
    if (!tokenModel) return unAuthorizedResponse(res, 401, "Invalid token");
    const now = new Date();
    const expiresAt = new Date(tokenModel.expiresAt);
    if (now > expiresAt) {
      await tokenModel.destroy();
      return errorResponse(res, 403, "Token expired");
    }
    const user = await model.findByPk(tokenModel.user_id);
    if (!user) return unAuthorizedResponse(res, 401, "Invalid token");
    req.model = user;
    return next();
  } catch (e) {
    serverSideErrorResponse(res, e);
  }
};
