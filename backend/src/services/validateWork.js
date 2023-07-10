const fs = require("fs");
const joi = require("joi");

const validateWork = (req, res, next) => {
  const {
    title,
    shortTitle,
    reference,
    description,
    created,
    location,
    sizes,
    story,
    externalLink,
    prevImage,
  } = req.body;
  const authorId = Number.parseInt(req.body.authorId, 10);
  const categoryId = Number.parseInt(req.body.categoryId, 10);
  const techniqueId = Number.parseInt(req.body.techniqueId, 10);
  const isPublished = Number.parseInt(req.body.isPublished, 10);
  const imageId = Number.parseInt(req.body.imageId, 10) || null;
  const schema = joi.object({
    title: joi.string().presence("required"),
    shortTitle: joi.string().allow(null),
    reference: joi.string().max(255, "utf8").presence("required"),
    description: joi.string().max(255, "utf8").presence("required"),
    authorId: joi.number().positive().integer().presence("required"),
    categoryId: joi.number().positive().integer().presence("required"),
    techniqueId: joi.number().positive().integer().presence("required"),
    created: joi.string().max(255, "utf8").presence("required"),
    location: joi.string().max(255, "utf8").presence("required"),
    sizes: joi.string().max(255, "utf8").allow(null),
    story: joi.string().allow(null),
    externalLink: joi
      .string()
      .uri({ scheme: /https?/ })
      .allow(null),
    isPublished: joi.number().integer().min(0).max(1),
    imageId: joi.number().positive().integer().allow(null),
    prevImage: joi.string().max(255, "utf8").allow(null),
  });
  const { value, error } = schema.validate({
    title,
    shortTitle,
    reference,
    description,
    authorId,
    categoryId,
    techniqueId,
    created,
    location,
    sizes,
    story,
    externalLink,
    isPublished,
    imageId,
    prevImage,
  });
  if (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  } else if (req.file) {
    const { destination, filename, mimetype } = req.file;
    const prevExtensionFile = value.prevImage
      ? `.${value.prevImage.split(".").reverse()[0]}`
      : null;
    let extensionFile;
    switch (mimetype) {
      case "image/jpeg":
        extensionFile = ".jpg";
        break;
      case "image/png":
        extensionFile = ".png";
        break;
      case "image/tiff":
        extensionFile = ".tiff";
        break;
      default:
        res.status(400).send("Le format du fichier est invalide.");
        break;
    }

    // If the previous file has a different MIME type, it has to be removed
    if (prevExtensionFile && prevExtensionFile !== extensionFile) {
      fs.rmSync(destination + reference + prevExtensionFile);
    }

    fs.rename(
      destination + filename,
      destination + reference + extensionFile,
      (err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          req.body = value;
          req.body.src = reference + extensionFile;
          next();
        }
      }
    );
  } else {
    req.body = value;
    req.body.src = req.body.prevImage;
    next();
  }
};

module.exports = validateWork;
