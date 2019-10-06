const multer = require("multer");
const shortid = require("shortid");

const path = require("path");

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "uploads"),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(shortid.generate(), ext);

      cb(null, `${name}-${Date.now()}${ext}`);
    }
  })
};
