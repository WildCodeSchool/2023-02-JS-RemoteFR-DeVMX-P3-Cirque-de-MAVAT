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

const edit = (req, res) => {
  const { id } = req.params;
  const {
    authorId,
    categoryId,
    techniqueId,
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
    .update(
      authorId,
      categoryId,
      techniqueId,
      reference,
      title,
      shortTitle,
      created,
      location,
      sizes,
      story,
      externalLink,
      isPublished,
      id
    )
    .then(([rows]) => {
      if (rows.affectedRows)
        // res.status(201).json({ affectedRows: rows.affectedRows });
        res.sendStatus(204);
      else res.sendStatus(500);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  const { affectedRows } = req.body;

  // Since row deletion from `images` table deletes all rows referring to it thanks to `ON DELETE CASCADE` constraint, there is no need for a query
  if (affectedRows) {
    res.status(204).json({ message: "L’œuvre a été supprimée avec succès." });
  } else {
    res
      .status(404)
      .json({ message: "L’œuvre à supprimer n’a pas été trouvée." });
  }
};

module.exports = {
  browse,
  read,
  create,
  edit,
  destroy,
};
