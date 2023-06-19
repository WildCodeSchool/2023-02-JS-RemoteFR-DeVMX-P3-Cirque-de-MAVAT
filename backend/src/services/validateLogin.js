const joi = require("joi");

const validateLogin = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email(),
    password: joi.string(),
  });
  const { email, password } = req.body;
  const { value, error } = schema.validate({ email, password });
  if (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  } else {
    req.body = value;
    next();
  }
};

module.exports = validateLogin;
