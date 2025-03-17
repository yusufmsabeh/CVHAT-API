import {
  serverSideErrorResponse,
  successResponse,
} from "../../services/response_handler.js";

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
    serverSideErrorResponse(res, 500, error);
  }
};
