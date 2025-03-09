export default {
  cv: {
    trim: true,
    notEmpty: {
      errorMessage: "cv id is required",
      bail: true,
    },
    isNumeric: {
      errorMessage: "cv id must be number",
    },
  },
};
