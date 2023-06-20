const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const models = require("../models");

const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashingOptions = {
      memoryCost: 2 ** 14,
      timeCost: 2,
      parallelism: 1,
    };
    const hashedPassword = await argon2.hash(password, hashingOptions);
    req.body.hashedPassword = hashedPassword;
    delete req.body.password;
    next();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ error: "There was a problem when validating the password." });
  }
};

const verifyPassword = async (req, res) => {
  try {
    const verifiedPassword = await argon2.verify(
      req.user.password,
      req.body.password
    );
    if (verifiedPassword) {
      const timestamp = Math.floor(Date.now() / 1000);
      const payload = {
        sub: req.body.email,
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

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    if (!authorizationHeader) {
      throw new Error("Authorization header is missing.");
    }
    const [type, token] = authorizationHeader.split(" ");
    if (type !== "Bearer") {
      throw new Error("Authorization header has not the `Bearer` type.");
    }
    req.payload = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.error(err);
    res
      .status(401)
      .send({ error: "Vous n’êtes pas autorisé à accéder à cette ressource." });
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
  hashPassword,
  verifyPassword,
  verifyToken,
  login,
};
