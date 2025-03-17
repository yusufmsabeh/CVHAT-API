import {
  errorResponse,
  serverSideErrorResponse,
  successResponse,
} from "../../services/response_handler.js";
import bcrypt from "bcrypt";
import { deleteSession } from "../../services/sessions_managment.js";
import { uploadToAzure } from "../../helpers/azure.js";
import validateFile from "../../services/validate_file.js";

export const getProfile = async (req, res) => {
  try {
    const user = req.model;
    successResponse(res, 200, "Profile retrieved successfully", {
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    serverSideErrorResponse(res, error);
  }
};
export const postProfile = async (req, res) => {
  try {
    const user = req.model;
    const { firstName = user.firstName, lastName = user.lastName } = req.body;
    user.set({
      firstName: firstName,
      lastName: lastName,
    });
    const updateUser = await user.save();
    successResponse(res, 200, "Profile updated successfully", {
      profile: {
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
        email: updateUser.email,
      },
    });
  } catch (error) {
    serverSideErrorResponse(res, error);
  }
};
export const postPassword = async (req, res) => {
  try {
    const user = req.model;
    const { oldPassword, newPassword } = req.body;
    if (!bcrypt.compareSync(oldPassword, user.password))
      return errorResponse(res, 401, "wrong password");
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.set({
      password: hashedPassword,
    });
    await user.save();
    await deleteSession(user.ID);
    successResponse(
      res,
      200,
      "Your password has been updated successfully. Please log in again to continue.",
    );
  } catch (error) {
    serverSideErrorResponse(res, error);
  }
};

export const postAvatar = async (req, res) => {
  try {
    const user = req.model;
    const avatar = req.file;
    const fileValidationRequest = validateFile(avatar, [
      "image/png",
      "image/jpeg",
      "image/jpg",
    ]);
    if (!fileValidationRequest.status)
      return errorResponse(res, 400, fileValidationRequest.message);
    const avatarName = `${user.ID}-avatar`;
    user.avatarURL = await uploadToAzure(
      avatar.buffer,
      avatarName,
      "avatar",
      avatar.mimetype,
      avatar.buffer.length,
      user.ID,
    );
    await user.save();
    successResponse(res, 200, "Avatar updated successfully", {
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatarURL: user.avatarURL,
      },
    });
  } catch (error) {
    serverSideErrorResponse(res, error);
  }
};
