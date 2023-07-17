const validateAdminRole = (req, res, next) => {
  const { role } = req.payload;
  if (role !== 1) {
    res
      .status(403)
      .send("Vous n’avez pas l’autorisation d’effectuer cette opération.");
  } else next();
};

module.exports = validateAdminRole;
