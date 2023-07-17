const models = require("../models");

const browse = (req, res) => {
  models.favourites
    .findAllFavourites(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const create = (req, res) => {
  const { userId, workId } = req.body;
  const payload = req.payload.sub;
  if (userId !== payload) {
    res
      .status(403)
      .send("Vous n’avez pas l’autorisation d’effectuer cette opération.");
  } else {
    models.favourites
      .create(userId, workId)
      .then(([rows]) => {
        res.status(201).json({ affectedRows: rows.affectedRows });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({
          error: "L’ajout aux favoris n’a pas pu être effectué avec succès.",
        });
      });
  }
};

const destroy = (req, res) => {
  const userId = Number.parseInt(req.params.userId, 10);
  const workId = Number.parseInt(req.params.workId, 10);
  const payload = req.payload.sub;
  if (userId !== payload) {
    res
      .status(403)
      .send("Vous n’avez pas l’autorisation d’effectuer cette opération.");
  } else {
    models.favourites
      .delete(userId, workId)
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.sendStatus(404);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
};

module.exports = {
  browse,
  create,
  destroy,
};
