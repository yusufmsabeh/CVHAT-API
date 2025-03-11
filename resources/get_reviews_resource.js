import CV from "../models/CV.js";

export default {
  attributes: ["ID", "isAI", "createdAt"],
  include: [
    {
      model: CV,
      attributes: ["title", "coverImageUrlLow", "fileName"],
    },
  ],
};
