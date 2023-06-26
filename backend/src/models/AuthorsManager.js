const AbstractManager = require("./AbstractManager");

class AuthorsManager extends AbstractManager {
  constructor() {
    super({ table: "authors" });
  }

  insert(authors) {
    return this.database.query(
      `insert into ${this.table} (firstname, lastname, artistname, birthdate, deathdate, birthplace, deathplace, biography) values (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        authors.firstname,
        authors.lastname,
        authors.artistname,
        authors.birthdate,
        authors.deathdate,
        authors.birthplace,
        authors.deathplace,
        authors.biography,
      ]
    );
  }

  update(authors) {
    return this.database.query(
      `update ${this.table} set firstname = ?, lastname = ?, artistname = ?, birthdate = ?, deathdate = ?, birthplace = ?, deathplace = ?, biography = ? where id = ?`,
      [
        authors.firstname,
        authors.lastname,
        authors.artistname,
        authors.birthdate,
        authors.deathdate,
        authors.birthplace,
        authors.deathplace,
        authors.biography,
        authors.id,
      ]
    );
  }
}

module.exports = AuthorsManager;
