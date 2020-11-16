import { Router } from 'express';
import Multer from 'multer';

import * as controller from './cvs.controller';
import * as validator from './cvs.validator';
import { multerConfig } from '../../config/file_upload';

const router = new Router();
const BASE_ROUTE = `/cvs`;

router.route(BASE_ROUTE).post(
  validator.createCvValidator,
  controller.createCv,
);

router.route(BASE_ROUTE).get(
  controller.readCvs,
);

router.route(`${BASE_ROUTE}/:id`).get(
  controller.readOneCv,
);

router.route(`${BASE_ROUTE}/:id/generate-docx`).get(
  controller.generateDocx,
);

router.route(`${BASE_ROUTE}/:id`).patch(
  validator.updateCvValidator,
  controller.updateCv,
);

router.route(`${BASE_ROUTE}/:id`).delete(
  controller.deleteCv,
);

router.route(`${BASE_ROUTE}/:id/profile-image`).put(
  Multer(multerConfig).single('profileImage'),
  controller.uploadProfileImage,
);

export default router;
