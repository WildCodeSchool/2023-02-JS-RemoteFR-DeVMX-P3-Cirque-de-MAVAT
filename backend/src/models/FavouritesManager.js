const AbstractManager = require("./AbstractManager");

class FavouritesManager extends AbstractManager {
  constructor() {
    super({ table: "favourites" });
  }
}

module.exports = FavouritesManager;
