import { body, param, query } from 'express-validator';
import moment from 'moment';
import { CardCode, CaseType, MedicalType } from '../utils/enum';

export default {
  register: [
    body('reservationDetailId')
      .notEmpty()
      .withMessage('reservationDetailId should not be empty')
      .isNumeric()
      .withMessage('reservationDetailId should be number'),
    body('date')
      .notEmpty()
      .withMessage('date should not be empty')
      .custom((date) => {
        if (!moment(date, "YYYY-MM-DD", true).isValid()) return false;
        return true;
      })
      .withMessage('date should be YYYY-MM-DD'),
    body('isNhi')
      .notEmpty()
      .withMessage('reservationDetailId should not be empty')
      .isBoolean()
      .withMessage('isNhi should be boolean'),
    body('hasIcCard')
      .optional({ nullable: true })
      .isBoolean()
      .withMessage('hasIcCard should be boolean'),
    body('cardExceptionCode')
      .optional({ nullable: true })
      .isIn(Object.values(CardCode))
      .withMessage(`cardExceptionCode should be ${Object.values(CardCode)}`),
    body('medicalType')
      .optional({ nullable: true })
      .isIn(Object.values(MedicalType))
      .withMessage(`cardExceptionCode should be ${Object.values(MedicalType)}`),
    body('medicalNumber')
      .optional({ nullable: true })
      .isString()
      .withMessage('Medical number should be string'),
    body('caseType')
      .optional({ nullable: true })
      .isIn(Object.values(CaseType))
      .withMessage(`cardExceptionCode should be ${Object.values(CaseType)}`),
    body('patientId')
      .notEmpty()
      .withMessage('patientId should not be empty')
      .isNumeric()
      .withMessage('patientId should be number'),
    body('payableAmount')
      .notEmpty()
      .withMessage('payableAmount should not be empty')
      .isNumeric()
      .withMessage('payableAmount should be number'),
    body('paidAmount')
      .optional({ nullable: true })
      .isNumeric()
      .withMessage('paidAmount should be number'),
  ],
  getClinic: [
    param('id')
      .notEmpty()
      .withMessage('id should not be empty')
      .isNumeric()
      .withMessage('id should be number'),
  ],
  start: [
    param('id')
      .notEmpty()
      .withMessage('id should not be empty')
      .isNumeric()
      .withMessage('id should be number'),
  ],
  updateSoap: [
    param('id')
      .notEmpty()
      .withMessage('id should not be empty')
      .isString()
      .withMessage('id should be string'),
    body('soap')
      .notEmpty()
      .withMessage('soap should not be empty')
      .isString()
      .withMessage('soap should be string'),
  ],
  finish: [
    param('id')
      .notEmpty()
      .withMessage('id should not be empty')
      .isNumeric()
      .withMessage('id should be number'),
  ],
  paid: [
    body('isNhi')
      .optional({ nullable: true })
      .isBoolean()
      .withMessage('isNhi should be boolean'),
    body('hasIcCard')
      .optional({ nullable: true })
      .isBoolean()
      .withMessage('hasIcCard should be boolean'),
    body('cardExceptionCode')
      .optional({ nullable: true })
      .isIn(Object.values(CardCode))
      .withMessage(`cardExceptionCode should be ${Object.values(CardCode)}`),
    body('medicalType')
      .optional({ nullable: true })
      .isIn(Object.values(MedicalType))
      .withMessage(`cardExceptionCode should be ${Object.values(MedicalType)}`),
    body('medicalNumber')
      .optional({ nullable: true })
      .isString()
      .withMessage('Medical number should be string'),
    body('caseType')
      .optional({ nullable: true })
      .isIn(Object.values(CaseType))
      .withMessage(`cardExceptionCode should be ${Object.values(CaseType)}`),
    body('payableAmount')
      .optional({ nullable: true })
      .isNumeric()
      .withMessage('payableAmount should be number'),
    body('paidAmount')
      .optional({ nullable: true })
      .isNumeric()
      .withMessage('paidAmount should be number'),
  ],
  unregister: [
    param('id')
      .notEmpty()
      .withMessage('id should not be empty')
      .isNumeric()
      .withMessage('id should be number'),
  ],
  getClinicByPatient: [
    param('patientId')
      .notEmpty()
      .withMessage('patientId should not be empty')
      .isNumeric()
      .withMessage('patientId should be number'),
    query('startDate')
      .optional({ nullable: true })
      .custom((startDate) => {
        if (!moment(startDate, "YYYY-MM-DD", true).isValid()) return false;
        return true;
      })
      .withMessage('startDate should be YYYY-MM-DD'),
    query('endDate')
      .optional({ nullable: true })
      .custom((endDate) => {
        if (!moment(endDate, "YYYY-MM-DD", true).isValid()) return false;
        return true;
      })
      .withMessage('endDate should be YYYY-MM-DD'),
  ],
};
