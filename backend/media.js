const fs = require("fs");

const saveImages = () => {
  const originDirectoryName = "./public/assets/images";
  const directory = fs.readdirSync(originDirectoryName);
  for (const file of directory) {
    if (file.includes("image-")) {
      const destinationFileName = file.replace("image-", "");
      fs.copyFileSync(
        `${originDirectoryName}/${file}`,
        `./public/assets/media/${destinationFileName}`
      );
    }
  }
};

module.exports = saveImages;
