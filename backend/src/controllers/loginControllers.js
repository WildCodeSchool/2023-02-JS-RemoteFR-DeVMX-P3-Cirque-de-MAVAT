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
    res.status(500).send("There was a problem when validating the password.");
  }
};

const verifyPassword = async (req, res) => {
  try {
    const verifiedPassword = await argon2.verify(
      req.user.password,
      req.body.password
    );
    if (verifiedPassword) {
      const payload = {
        sub: req.user.id,
      };
      const options = {
        expiresIn: "1h",
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, options);
      delete req.user.hashedPassword;
      res.status(200).send({ token, user: req.user });
    } else res.sendStatus(401);
  } catch (err) {
    console.error(err);
    res.status(500).send("There was a problem when verifying the password.");
  }
};

const login = (req, res, next) => {
  models.login
    .findUser(req.body)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        // eslint-disable-next-line prefer-destructuring
        req.user = rows[0];
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  hashPassword,
  verifyPassword,
  login,
};
