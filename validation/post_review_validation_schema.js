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
  title: {
    trim: true,
    notEmpty: {
      errorMessage: "title is required",
      bail: true,
    },
    isLength: {
      options: {
        max: 20,
      },
      errorMessage: "title is too long",
    },
  },
};
