import Sharp from 'sharp';

import Employee from './employees.model';
import { InternalError, NotFound } from '../../utils/error';

/**
 * Create employee
 */

export const createEmployee = async (req, res, next) => {
  const employee = new Employee(req.body);
  
  try {
    const result = await employee.save();
    res.status(201).json(result);
  } catch (error) {
    next(new InternalError(error));
  }
};

/**
 * Read employees
 */

export const readEmployees = async (_req, res, next) => {
  try {
    const result = await Employee.find({});
    res.status(200).json(result);
  } catch (error) {
    next(new InternalError(error));
  }
};

/**
 * Read one employee
 */

export const readOneEmployee = async (req, res, next) => {
  try {
    const result = await Employee.findById(req.params.id);

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
 * Update one employee
 */

export const updateEmployee = async (req, res, next) => {
  try {
    const result = await Employee.findByIdAndUpdate(req.params.id, req.body);

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
 * Delete one employee
 */

export const deleteEmployee = async (req, res, next) => {
  try {
    const result = await Employee.findByIdAndDelete(req.params.id);

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
 * Upload employee profile image
 */

export const uploadProfileImage = async (req, res, next) => {
  try {
    const user = await Employee.findById(req.params.id);
    const buffer = await Sharp(req.file.buffer).toBuffer();

    if (!user) {
      next(new NotFound());

      return;
    }

    user.avatar = buffer;
    await user.save();

    res.sendStatus(204);
  } catch (error) {
    next(new InternalError(error));
  }
};