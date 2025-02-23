import {
  errorResponse,
  serverSideErrorResponse,
  successResponse,
  unAuthorizedResponse,
} from "../../services/response_handler.js";
import bcrypt from "bcrypt";
import validateRequest from "../../services/validate_request.js";
import { getOrCreateSession } from "../../services/sessions_managment.js";
export const postSignup = async (req, res) => {
  try {
    if (validateRequest(req, res)) return;
    const { firstName, lastName, email, password } = req.body;
    const user = await req.model.findOne({ where: { email: email } });
    if (user)
      return errorResponse(res, 400, "User already exists with this email");
    const hashedPassword = bcrypt.hashSync(password, 10);
    await req.model.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });
    return successResponse(res, 200, "User successfully created");
  } catch (error) {
    serverSideErrorResponse(res, error);
  }
};

export const postLogin = async (req, res) => {
  try {
    if (validateRequest(req, res)) return;
    const { email, password } = req.body;
    const user = await req.model.findOne({
      where: { email: email },
    });
    if (!user) return unAuthorizedResponse(res, 401, "Wrong email or password");
    if (!bcrypt.compareSync(password, user.password))
      return unAuthorizedResponse(res, 401, "Wrong email or password");
    const token = await getOrCreateSession(user.ID);
    successResponse(res, 200, "Logged in successfully", {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: token,
    });
  } catch (error) {
    serverSideErrorResponse(res, error);
  }
};
