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

module.exports = {
  browse,
};
