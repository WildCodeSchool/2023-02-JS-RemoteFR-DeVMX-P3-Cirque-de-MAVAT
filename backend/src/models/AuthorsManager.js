const AbstractManager = require("./AbstractManager");

class AuthorsManager extends AbstractManager {
  constructor() {
    super({ table: "authors" });
  }

  insert(authors) {
    return this.database.query(
      `insert into ${this.table} (firstname) values (?)`,
      [authors.firstname]
    );
  }

  update(authors) {
    return this.database.query(
      `update ${this.table} firstname = ? where id = ?`,
      [authors.firstname, authors.id]
    );
  }
}

module.exports = AuthorsManager;
