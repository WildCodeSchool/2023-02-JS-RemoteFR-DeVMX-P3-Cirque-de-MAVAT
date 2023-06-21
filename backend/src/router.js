const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const worksControllers = require("./controllers/worksControllers");
const usersControllers = require("./controllers/usersControllers");
const authorsControllers = require("./controllers/authorsControllers");
const loginControllers = require("./controllers/loginControllers");

const validateLogin = require("./services/validateLogin");
const validateSignup = require("./services/validateSignup");
const hashPassword = require("./services/hashPassword");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.get("/works", worksControllers.browse);
router.get("/works/:id", worksControllers.read);

router.get("/users", usersControllers.browse);
router.get("/users/:id", usersControllers.read);
router.delete("/users/:id", usersControllers.destroy);

router.get("/authors", authorsControllers.browse);
router.get("/authors/:id", authorsControllers.read);

router.post(
  "/login",
  validateLogin,
  loginControllers.login,
  loginControllers.verifyPassword
);

router.post("/users", validateSignup, hashPassword, usersControllers.create);

module.exports = router;
