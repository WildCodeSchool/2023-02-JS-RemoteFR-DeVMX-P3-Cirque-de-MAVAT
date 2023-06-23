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
}

module.exports = UsersManager;
