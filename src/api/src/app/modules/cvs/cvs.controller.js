import Sharp from 'sharp';
import { Packer } from 'docx';
import stream from 'stream';

import CV from './cvs.model';
import { InternalError, NotFound } from '../../utils/error';
import generateDocxFunction from '../../helpers/generateDocx';

/**
 * Create CV
 */

export const createCv = async (req, res, next) => {
  const cv = new CV(req.body);
  
  try {
    const result = await cv.save();
    res.status(201).json(result);
  } catch (error) {
    next(new InternalError(error));
  }
};

/**
 * Read CVs
 */

export const readCvs = async (_req, res, next) => {
  try {
    const result = await CV.find({}, { profileImage: 0 });
    res.status(200).json(result);
  } catch (error) {
    next(new InternalError(error));
  }
};

/**
 * Read one CV
 */

export const readOneCv = async (req, res, next) => {
  try {
    const result = await CV.findById(req.params.id);

    if (!result) {
      next(new NotFound());
      
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    next(new InternalError(error));
  }
};

/**
 * Update one CV
 */

export const updateCv = async (req, res, next) => {
  try {
    const result = await CV.findByIdAndUpdate(req.params.id, req.body);

    if (!result) {
      next(new NotFound());

      return;
    }

    res.sendStatus(204);
  } catch (error) {
    next(new InternalError(error));
  }
};

/**
 * Delete one CV
 */

export const deleteCv = async (req, res, next) => {
  try {
    const result = await CV.findByIdAndDelete(req.params.id);

    if (!result) {
      next(new NotFound());

      return;
    }

    res.sendStatus(204);
  } catch (error) {
    next(new InternalError(error));
  }
};

/**
 * Update CV profile image
 */

export const uploadProfileImage = async (req, res, next) => {
  try {
    const user = await CV.findById(req.params.id);
    const buffer = await Sharp(req.file.buffer).toBuffer();

    if (!user) {
      next(new NotFound());

      return;
    }

    user.profileImage = buffer;
    await user.save();

    res.sendStatus(204);
  } catch (error) {
    next(new InternalError(error));
  }
};

/**
 * Generate Docx
 */

export const generateDocx = async (req, res, next) => {
  try {
    const user = await CV.findById(req.params.id);
    
    if (!user) {
      next(new NotFound());

      return;
    }

    const doc = generateDocxFunction(user.toJSON(), user.profileImage);
    const packedDocx = await Packer.toBuffer(doc);
    const fileContents = Buffer.from(packedDocx, 'binary');
  
    const readStream = new stream.PassThrough();
    readStream.end(fileContents);

    res.set('Content-disposition', `attachment; filename=${user.firstName} ${user.lastName}.docx`);
    res.set('Content-Type', 'text/plain');
    
    readStream.pipe(res);
  } catch (error) {
    next(new InternalError(error));
  }
};
