const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const models = require("../models");

const verifyPassword = async (req, res) => {
  try {
    const verifiedPassword = await argon2.verify(
      req.user.password,
      req.body.password
    );
    if (verifiedPassword) {
      const timestamp = Math.floor(Date.now() / 1000);
      const payload = {
        sub: req.user.id,
        role: req.user.role,
        iat: timestamp,
      };
      const options = {
        expiresIn: "1h",
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, options);
      delete req.user.password;
      res.status(200).send({ token, user: req.user });
    } else {
      res.status(400).send({ error: "Vos identifiants ne sont pas valides." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: "Il y a eu un problème lors de la vérification du mot de passe.",
    });
  }
};

const login = (req, res, next) => {
  models.login
    .findUser(req.body)
    .then(([rows]) => {
      if (rows.length) {
        [req.user] = rows;
        next();
      } else {
        res
          .status(400)
          .send({ error: "Vos identifiants ne sont pas valides." });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        error:
          "Il y a eu un problème lors de la vérification de l’identifiant.",
      });
    });
};

module.exports = {
  verifyPassword,
  login,
};
