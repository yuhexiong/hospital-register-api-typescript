import { body, param } from 'express-validator';
import moment from 'moment';
import { Gender } from '../utils/enum';

export default {
  createPatient: [
    body('name')
      .notEmpty()
      .withMessage('name should not be empty')
      .isString()
      .withMessage('name should be string'),
    body('birthday')
      .optional({ nullable: true })
      .custom((birthday) => {
        if (birthday && !moment(birthday, "YYYY-MM-DD", true).isValid()) return false;
        return true;
      })
      .withMessage('birthday should be YYYY-MM-DD'),
    body('gender')
      .optional({ nullable: true })
      .isIn(Object.values(Gender))
      .withMessage(`gender should be ${Object.values(Gender)}`),
    body('email')
      .optional({ nullable: true })
      .isString()
      .withMessage('email should be string'),
    body('phone')
      .optional({ nullable: true })
      .isString()
      .withMessage('phone should be string'),
  ],
  getPatientByName: [
    param('name')
      .notEmpty()
      .withMessage('name should not be empty')
      .isString()
      .withMessage('name should be string'),
  ],
  getPatientById: [
    param('id')
      .notEmpty()
      .withMessage('id should not be empty')
      .isNumeric()
      .withMessage('id should be number'),
  ],
  getAllPatients: [
  ],
  updatePatient: [
    param('id')
      .notEmpty()
      .withMessage('id should not be empty')
      .isNumeric()
      .withMessage('id should be number'),
    body('name')
      .optional({ nullable: true })
      .isString()
      .withMessage('name should be string'),
    body('birthday')
      .optional({ nullable: true })
      .custom((birthday) => {
        if (birthday && !moment(birthday, "YYYY-MM-DD", true).isValid()) return false;
        return true;
      })
      .withMessage('birthday should be YYYY-MM-DD'),
    body('gender')
      .optional({ nullable: true })
      .isIn(Object.values(Gender))
      .withMessage(`gender should be ${Object.values(Gender)}`),
    body('email')
      .optional({ nullable: true })
      .isString()
      .withMessage('email should be string'),
    body('phone')
      .optional({ nullable: true })
      .isString()
      .withMessage('phone should be string'),
  ],
  deletePatient: [
    param('id')
      .notEmpty()
      .withMessage('id should not be empty')
      .isNumeric()
      .withMessage('id should be number'),
  ],
};
