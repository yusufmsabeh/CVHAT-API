export default {
  email: {
    trim: true,
    notEmpty: {
      errorMessage: "Email is required",
      bail: true,
    },
    isEmail: {
      errorMessage: "Invalid email address",
    },
  },
};
