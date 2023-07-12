const express = require("express");

const router = express.Router();

const multer = require("multer");

const upload = multer({ dest: "./public/assets/media/" });

const itemControllers = require("./controllers/itemControllers");
const imagesControllers = require("./controllers/imagesControllers");
const worksControllers = require("./controllers/worksControllers");
const usersControllers = require("./controllers/usersControllers");
const authorsControllers = require("./controllers/authorsControllers");
const loginControllers = require("./controllers/loginControllers");
const categoriesControllers = require("./controllers/categoriesControllers");
const techniquesControllers = require("./controllers/techniquesControllers");
const favouritesControllers = require("./controllers/favouritesControllers");

const validateLogin = require("./services/validateLogin");
const validateSignup = require("./services/validateSignup");
const hashPassword = require("./services/hashPassword");
const verifyToken = require("./services/verifyToken");
const validateWork = require("./services/validateWork");
const validateUpdate = require("./services/validateUpdate");
const removeImage = require("./services/removeImage");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.get("/works", worksControllers.browse);
router.get("/works/:id", worksControllers.read);

router.get("/users", usersControllers.browse);
router.get("/users/:id", usersControllers.read);

router.get("/authors", authorsControllers.browse);
router.get("/authors/:id", authorsControllers.read);

router.get("/categories", categoriesControllers.browse);

router.get("/techniques", techniquesControllers.browse);

router.get("/favourites/:id", favouritesControllers.browse);

router.get("/images/:id", imagesControllers.read);

router.post(
  "/login",
  validateLogin,
  loginControllers.login,
  loginControllers.verifyPassword
);

router.post("/users", validateSignup, hashPassword, usersControllers.create);

router.use(verifyToken);

router.post(
  "/works",
  upload.single("image"),
  validateWork,
  imagesControllers.create,
  worksControllers.create
);
router.put(
  "/works/:id",
  upload.single("image"),
  validateWork,
  imagesControllers.edit,
  worksControllers.edit
);

router.put("/users/:id", validateUpdate, hashPassword, usersControllers.edit);
router.delete("/users/:id", usersControllers.destroy);

router.post("/authors", authorsControllers.add);
router.put("/authors/:id", authorsControllers.edit);
router.delete("/authors/:id", authorsControllers.destroy);

router.post("/favourites", favouritesControllers.create);
router.delete("/favourites/:userId/:workId", favouritesControllers.destroy);

router.delete(
  "/images/:id/:file",
  removeImage,
  imagesControllers.destroy,
  worksControllers.destroy
);

module.exports = router;
