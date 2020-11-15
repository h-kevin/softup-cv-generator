import Multer from 'multer';

const multerConfig = Multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(_req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'));
    }
      
    return cb(undefined, true);
  },
});

export default multerConfig;