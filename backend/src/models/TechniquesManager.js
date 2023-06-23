const AbstractManager = require("./AbstractManager");

class TechniquesManager extends AbstractManager {
  constructor() {
    super({ table: "techniques" });
  }
}

module.exports = TechniquesManager;
