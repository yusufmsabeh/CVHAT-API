import crypto from "crypto";
import ResetPasswordToken from "../models/ResetPasswordToken.js";
export const createResetPasswordToken = async (userId) => {
  const resetPasswordToken = await ResetPasswordToken.create({
    user_id: userId,
    token_id: crypto.randomBytes(16).toString("hex"),
  });
  return resetPasswordToken.token_id;
};

export const deleteResetPasswordToken = async (userId) => {
  await ResetPasswordToken.destroy({ where: { user_id: userId } });
};
