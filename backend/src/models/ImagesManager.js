const AbstractManager = require("./AbstractManager");

class ImagesManager extends AbstractManager {
  constructor() {
    super({ table: "images" });
  }

  create(src, description) {
    return this.database.query(
      `INSERT INTO ${this.table} (src, description) VALUES (?, ?)`,
      [src, description]
    );
  }
}

module.exports = ImagesManager;
