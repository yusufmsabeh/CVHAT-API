export default {
  oldPassword: {
    trim: true,

    notEmpty: {
      errorMessage: "Old password is required",
      bail: true,
    },
    isLength: {
      options: {
        min: 8,
      },
      errorMessage: "Old password must be at least 8 characters",
    },
  },
  newPassword: {
    trim: true,

    notEmpty: {
      errorMessage: "New password is required",
      bail: true,
    },
    isLength: {
      options: {
        min: 8,
      },
      errorMessage: "Password must be at least 8 characters",
    },
  },
};
