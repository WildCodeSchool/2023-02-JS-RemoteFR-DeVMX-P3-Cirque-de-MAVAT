const argon2 = require("argon2");

const hashPassword = async (req, res, next) => {
  const { password } = req.body;
  if (password) {
    try {
      const hashingOptions = {
        memoryCost: 2 ** 14,
        timeCost: 2,
        parallelism: 1,
      };
      const hashedPassword = await argon2.hash(password, hashingOptions);
      req.body.password = hashedPassword;
      next();
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send({ error: "There was a problem when validating the password." });
    }
  } else next();
};

module.exports = hashPassword;
