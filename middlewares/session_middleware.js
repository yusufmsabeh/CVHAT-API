import Session from "../models/Session.js";
import {
  serverSideErrorResponse,
  unAuthorizedResponse,
} from "../services/response_handler.js";

export default async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    const model = req.model;
    if (!token)
      return res.status(401).json({
        status: "unauthorized",
        code: 401,
        message: "Not authorized, please try to login",
      });
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
