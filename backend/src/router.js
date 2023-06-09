const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const worksControllers = require("./controllers/worksControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.get("/works", worksControllers.browse);

module.exports = router;
