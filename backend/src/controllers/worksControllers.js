const models = require("../models");

const browse = (req, res) => {
  models.works
    .findAllWorks()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.works
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const create = (req, res) => {
  const {
    authorId,
    categoryId,
    techniqueId,
    imageId,
    reference,
    title,
    shortTitle,
    created,
    location,
    sizes,
    story,
    externalLink,
    isPublished,
  } = req.body;
  models.works
    .create(
      authorId,
      categoryId,
      techniqueId,
      imageId,
      reference,
      title,
      shortTitle,
      created,
      location,
      sizes,
      story,
      externalLink,
      isPublished
    )
    .then(([rows]) => {
      res.status(201).json({ id: rows.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: "L’œuvre n’a pas pu être ajoutée.",
      });
    });
};

module.exports = {
  browse,
  read,
  create,
};
