const AbstractManager = require("./AbstractManager");

class WorksManager extends AbstractManager {
  constructor() {
    super({ table: "works" });
  }

  findAllWorks() {
    return this.database.query(
      `SELECT * FROM ${this.table} 
      JOIN authors ON ${this.table}.author_id=authors.id
      JOIN categories ON ${this.table}.category_id=categories.id
      JOIN techniques ON ${this.table}.technique_id=techniques.id
      JOIN images ON ${this.table}.image_id=images.id
      `
    );
  }
}

module.exports = WorksManager;
