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
}

module.exports = AuthorsManager;
