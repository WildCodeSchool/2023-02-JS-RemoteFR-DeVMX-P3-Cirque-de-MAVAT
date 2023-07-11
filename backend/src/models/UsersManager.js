const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  create(email, password, firstname, lastname, role) {
    return this.database.query(
      `INSERT INTO ${this.table} (email, password, firstname, lastname, role) VALUES (?, ?, ?, ?, ?)`,
      [email, password, firstname, lastname, role]
    );
  }

  update(email, password, firstname, lastname, role, id) {
    const hasRoleToUpdate = typeof role === "number";
    if (password && hasRoleToUpdate) {
      return this.database.query(
        `UPDATE ${this.table} SET email = ?, password = ?, firstname = ?, lastname = ?, role = ? WHERE id = ?`,
        [email, password, firstname, lastname, role, id]
      );
    }
    if (password) {
      return this.database.query(
        `UPDATE ${this.table} SET email = ?, password = ?, firstname = ?, lastname = ? WHERE id = ?`,
        [email, password, firstname, lastname, id]
      );
    }
    if (hasRoleToUpdate) {
      return this.database.query(
        `UPDATE ${this.table} SET email = ?, firstname = ?, lastname = ?, role = ? WHERE id = ?`,
        [email, firstname, lastname, role, id]
      );
    }
    return this.database.query(
      `UPDATE ${this.table} SET email = ?, firstname = ?, lastname = ? WHERE id = ?`,
      [email, firstname, lastname, id]
    );
  }
}

module.exports = UsersManager;
