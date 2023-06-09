const AbstractManager = require("./AbstractManager");

class WorksManager extends AbstractManager {
  constructor() {
    super({ table: "works" });
  }
}

module.exports = WorksManager;
