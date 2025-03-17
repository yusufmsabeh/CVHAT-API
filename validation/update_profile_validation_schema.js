export default {
  firstName: {
    trim: true,
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
    isLength: {
      options: {
        min: 2,
        max: 20,
      },
      errorMessage: "First name is too short or long",
    },
  },
};
