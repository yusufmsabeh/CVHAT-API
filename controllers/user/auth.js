import {
  errorResponse,
  serverSideErrorResponse,
  successResponse,
} from "../../services/response_handler.js";
import bcrypt from "bcrypt";
import validateRequest from "../../services/validate_request.js";
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
