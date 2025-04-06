import Session from "../models/Session.js";
import {
  errorResponse,
  serverSideErrorResponse,
  unAuthorizedResponse,
} from "../services/response_handler.js";

export default async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    const model = req.model;
    if (!token) return errorResponse(res, 401, "No token provided");
    const session = await Session.findOne({
      where: {
        session_id: token,
      },
    });
    if (!session)
      return unAuthorizedResponse(
        res,
        401,
        "Not authorized, please try to login",
      );
      const now = new Date();
      const expiresAt = new Date(session.expiresAt);
        if (now > expiresAt) {
        await session.destroy();
        return errorResponse(res, 403, "Token expired");
      }
    const user = await model.findByPk(session.user_id);
    if (!user)
      return unAuthorizedResponse(
        res,
        401,
        "Not authorized, please try to login",
      );
    req.model = user;
    return next();
  } catch (e) {
    serverSideErrorResponse(res, e);
  }
};
