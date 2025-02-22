const attachModel = (model) => (req, res, next) => {
  req.model = model;
  next();
};

export default attachModel;
