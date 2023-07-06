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

  create(userId, workId) {
    return this.database.query(
      `INSERT INTO ${this.table} (user_id, work_id) VALUES (?, ?)`,
      [userId, workId]
    );
  }

  delete(userId, workId) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE user_id = ? AND work_id =?`,
      [userId, workId]
    );
  }
}
module.exports = FavouritesManager;
