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

  update(src, description, id) {
    return this.database.query(
      `UPDATE ${this.table} SET src = ?, description = ? WHERE id = ?`,
      [src, description, id]
    );
  }
}

module.exports = ImagesManager;
