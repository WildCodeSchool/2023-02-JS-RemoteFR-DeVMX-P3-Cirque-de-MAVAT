const joi = require("joi");

const validateUpdate = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().allow(null),
    firstname: joi.string().max(255, "utf8").allow(null),
    lastname: joi.string().max(255, "utf8").allow(null),
  });
  const { email, password, firstname, lastname } = req.body;
  const { value, error } = schema.validate({
    email,
    password,
    firstname,
    lastname,
  });
  if (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  } else {
    req.body = value;
    next();
  }
};

module.exports = validateUpdate;
