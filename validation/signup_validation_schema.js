export default {
  firstName: {
    trim: true,
    notEmpty: {
      errorMessage: "First Name is required",
      bail: true,
    },
    isLength: {
      options: {
        min: 2,
        max: 20,
      },
      errorMessage: "First name is too short or long",
    },
  },
  lastName: {
    trim: true,
    notEmpty: {
      errorMessage: "Last Name is required",
      bail: true,
    },
    isLength: {
      options: {
        min: 2,
        max: 20,
      },
      errorMessage: "First name is too short or long",
    },
  },
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
  password: {
    trim: true,

    notEmpty: {
      errorMessage: "Password is required",
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
