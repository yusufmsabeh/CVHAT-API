import Session from "../models/Session.js";
import crypto from "crypto";
exports.getOrCreateSession = async (userId) => {
  let session = await Session.findOne({
    where: {
      user_id: userId,
    },
  });
  if (session) return session.session_id;
  session = await Session.create({
    user_id: userId,
    session_id: crypto.randomBytes(16).toString("hex"),
  });
  return session.session_id;
};

exports.deleteSession = async (userId) => {
  await Session.destroy({ where: { user_id: userId } });
};
