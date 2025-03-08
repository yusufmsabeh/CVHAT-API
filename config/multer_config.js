import multer from "multer";

const storage = multer.memoryStorage({
  filename: (req, file, cb) => {
    const userID = req.model.ID;
    const fileName = `${userID}-${file.originalname}-${Date.now()}.pdf`;
    cb(null, fileName);
  },
});

export default {
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
};
