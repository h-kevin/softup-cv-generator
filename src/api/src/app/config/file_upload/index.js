import Multer from 'multer';

import { allowedImageTypes } from '../../constants/validation';

export const multerConfig = Multer.memoryStorage = {
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (_req, file, cb) => {
    if (allowedImageTypes.includes(file.mimetype)) {
      return cb(null, true);
    }
    
    return cb(null, false);
  },
};
