const fs = require("fs");

const removeImage = (req, res, next) => {
  const { file } = req.body;
  fs.rm(`./public/assets/media/${file}`, (err) => {
    if (err) res.status(500).send(err);
    else next();
  });
};

module.exports = removeImage;
