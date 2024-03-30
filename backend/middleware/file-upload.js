const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  limits: {
    fileSize: 500000, // 500 KB limit
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuidv4() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValidMimeType = !!MIME_TYPE_MAP[file.mimetype];
    const isValidExtension = file.originalname.match(/\.(jpg|jpeg|png)$/);

    if (isValidMimeType && isValidExtension) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type or extension"));
    }
  },
});

module.exports = fileUpload;
