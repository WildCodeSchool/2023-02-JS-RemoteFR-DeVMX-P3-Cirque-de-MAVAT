const joi = require("joi");

const validateSignup = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().presence("required"),
    password: joi.string().presence("required"),
    firstname: joi.string().max(255, "utf8").allow(null),
    lastname: joi.string().max(255, "utf8").allow(null),
    role: joi.number().integer().min(0).max(1),
  });
  const { email, password, firstname, lastname } = req.body;
  const role = Number.parseInt(req.body.role, 10) || 0;
  const { value, error } = schema.validate({
    email,
    password,
    firstname,
    lastname,
    role,
  });
  if (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  } else {
    req.body = value;
    next();
  }
};

module.exports = validateSignup;
