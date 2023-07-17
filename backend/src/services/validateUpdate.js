const joi = require("joi");

const validateUpdate = (req, res, next) => {
  const id = Number.parseInt(req.params.id, 10);
  const role = req.body.role ? Number.parseInt(req.body.role, 10) : null;
  const payload = role !== null ? req.payload.role : req.payload.sub;
  const isInvalidPayload = !(
    (role !== null && req.payload.role === 1) ||
    (role === null && payload === id)
  );
  if (isInvalidPayload) {
    res
      .status(403)
      .send("Vous n’avez pas l’autorisation d’effectuer cette opération.");
  } else {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().allow(null),
      firstname: joi.string().max(255, "utf8").allow(null),
      lastname: joi.string().max(255, "utf8").allow(null),
      role: joi.number().integer().min(0).max(1).allow(null),
    });
    const { email, password, firstname, lastname } = req.body;
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
      if (role === null) delete value.role;
      req.body = value;
      next();
    }
  }
};

module.exports = validateUpdate;
