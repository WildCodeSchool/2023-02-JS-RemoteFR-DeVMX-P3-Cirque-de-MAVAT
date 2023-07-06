const models = require("../models");

const read = (req, res) => {
  const { id } = req.params;
  models.images
    .find(id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

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

const edit = (req, res, next) => {
  const { src, description, imageId, prevImage } = req.body;
  if (src === prevImage) next();
  else {
    models.images
      .update(src, description, imageId)
      .then(([rows]) => {
        if (rows.affectedRows) next();
        else {
          console.error("No affected rows");
          res.sendStatus(500);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
};

const destroy = (req, res, next) => {
  const { id } = req.body;
  models.images
    .delete(id)
    .then(([rows]) => {
      req.body.affectedRows = rows.affectedRows;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  read,
  create,
  edit,
  destroy,
};
