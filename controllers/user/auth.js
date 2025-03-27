import {
  errorResponse,
  serverSideErrorResponse,
  successResponse,
  unAuthorizedResponse,
} from "../../services/response_handler.js";
import bcrypt from "bcrypt";
import {
  getOrCreateSession,
  deleteSession,
} from "../../services/sessions_managment.js";
import User from "../../models/User.js";
import otpGenerator from "otp-generator";
import OTP from "../../models/OTP.js";
import { sendOTPEmail } from "../../services/email_service.js";
import {
  createResetPasswordToken,
  deleteResetPasswordToken,
} from "../../services/reset_password_tokens_managment.js";

export const postSignup = async (req, res) => {
  try {
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
      avatarURL: user.avatarURL,
      token: token,
    });
  } catch (error) {
    serverSideErrorResponse(res, error);
  }
};

export const postLogout = async (req, res) => {
  try {
    await deleteSession(req.model.ID);
    successResponse(res, 200, "Logged out successfully");
  } catch (error) {
    serverSideErrorResponse(res, error);
  }
};

export const postSendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user)
      return errorResponse(res, 404, "There is no account with this email");
    const otp = otpGenerator.generate(4, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    await sendOTPEmail(otp, email);
    await OTP.create({
      email: email,
      otp: otp,
    });
    successResponse(res, 200, "OTP email sent successfully");
  } catch (error) {
    serverSideErrorResponse(res, error);
  }
};

export const postVerifyOTP = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const otpModel = await OTP.findOne({
      where: {
        email: email,
        otp: otp,
      },
    });
    if (!otpModel) return errorResponse(res, 404, "Invalid OTP or email");
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user)
      return errorResponse(res, 404, "There is no account with this email");
    const now = new Date();
    const expiresAt = new Date(otpModel.expiresAt);
    if (now > expiresAt) {
      await otpModel.destroy();
      return errorResponse(res, 403, "OTP expired");
    }
    const resetPasswordToken = await createResetPasswordToken(user.ID);
    await otpModel.destroy();
    successResponse(res, 200, "OTP Verified", {
      token: resetPasswordToken,
    });
  } catch (error) {
    serverSideErrorResponse(res, error);
  }
};
export const postResetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const user = req.model;
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.set({
      password: hashedPassword,
    });
    await user.save();
    await deleteResetPasswordToken(user.ID);
    successResponse(res, 200, "Your password has been changed successfully");
  } catch (error) {
    serverSideErrorResponse(res, error);
  }
};
