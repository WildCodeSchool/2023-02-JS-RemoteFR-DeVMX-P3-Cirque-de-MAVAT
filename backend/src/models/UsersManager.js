const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  create(email, password, firstname, lastname) {
    return this.database.query(
      `INSERT INTO ${this.table} (email, password, firstname, lastname) VALUES (?, ?, ?, ?)`,
      [email, password, firstname, lastname]
    );
  }

  update(email, password, firstname, lastname, id) {
    if (password) {
      return this.database.query(
        `UPDATE ${this.table} SET email = ?, password = ?, firstname = ?, lastname = ? WHERE id = ?`,
        [email, password, firstname, lastname, id]
      );
    }
    return this.database.query(
      `UPDATE ${this.table} SET email = ?, firstname = ?, lastname = ? WHERE id = ?`,
      [email, firstname, lastname, id]
    );
  }
}

module.exports = UsersManager;
