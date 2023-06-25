const models = require("../models");

const create = (req, res, next) => {
  const { description, src } = req.body;
  models.images
    .create(src, description)
    .then(([rows]) => {
      if (rows.affectedRows) {
        req.body.imageId = rows.insertId;
        next();
      } else {
        console.error("No affected rows");
        res.sendStatus(500);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  create,
};
