const AbstractManager = require("./AbstractManager");

class FavouritesManager extends AbstractManager {
  constructor() {
    super({ table: "favourites" });
  }

  findAllFavourites(id) {
    return this.database.query(
      `SELECT work_id
    FROM ${this.table}
    WHERE user_id = ?
    `,
      [id]
    );
  }
}
module.exports = FavouritesManager;
