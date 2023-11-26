import { body, param } from 'express-validator';

export default {
  createDoctor: [
    body('id')
      .notEmpty()
      .withMessage('id should not be empty')
      .isString()
      .withMessage('id should be string'),
    body('name')
      .notEmpty()
      .withMessage('name should not be empty')
      .isString()
      .withMessage('name should be string'),
  ],
  getDoctor: [
    param('id')
      .notEmpty()
      .withMessage('id should not be empty')
      .isString()
      .withMessage('id should be string'),
  ],
  getAllDoctors: [
  ],
  updateDoctor: [
    param('id')
      .notEmpty()
      .withMessage('id should not be empty')
      .isString()
      .withMessage('id should be string'),
    param('name')
      .notEmpty()
      .withMessage('name should not be empty')
      .isString()
      .withMessage('name should be string'),
  ],
};
