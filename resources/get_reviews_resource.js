import CV from "../models/CV.js";

export default {
  attributes: ["ID", "title", "isAI", "isFavorite", "createdAt"],
  include: [
    {
      model: CV,
      attributes: ["coverImageUrlLow", "fileName"],
    },
  ],
};
