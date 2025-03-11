export default {
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
