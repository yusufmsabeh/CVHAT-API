import crypto from "crypto";
export const getOrCreateSession = async (sessionModel,userId) => {
  let session = await sessionModel.findOne({
    where: {
      user_id: userId,
    },
  });
  if (session) return session.token;
  session = await sessionModel.create({
    user_id: userId,
    token: crypto.randomBytes(16).toString("hex"),
  });
  return session.token;
};

export const deleteSession = async (sessionModel,userId) => {
  await sessionModel.destroy({ where: { user_id: userId } });
};
