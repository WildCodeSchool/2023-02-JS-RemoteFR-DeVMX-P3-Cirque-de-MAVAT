const fs = require("fs");
const joi = require("joi");

const removeImage = (req, res, next) => {
  const id = Number.parseInt(req.params.id, 10);
  const { file } = req.params;
  const schema = joi.object({
    id: joi.number().positive().integer().presence("required"),
    file: joi.string().max(255, "utf8").presence("required"),
  });
  const { value, error } = schema.validate({ id, file });
  if (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  } else {
    fs.rm(`./public/assets/media/${file}`, (err) => {
      if (err) res.status(500).send(err);
      else {
        req.body = value;
        next();
      }
    });
  }
};

module.exports = removeImage;
