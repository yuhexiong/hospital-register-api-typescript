import { body, param } from 'express-validator';
import { Division, ReservationFrom, ReservationType, TimeSlot } from '../utils/enum';
import moment from 'moment';

export default {
  createReservationList: [
    body('date')
      .notEmpty()
      .withMessage('date should not be empty')
      .custom((date) => {
        if (!moment(date, "YYYY-MM-DD", true).isValid()) return false;
        return true;
      })
      .withMessage('date should be YYYY-MM-DD'),
    body('timeSlot')
      .notEmpty()
      .withMessage('timeSlot should not be empty')
      .isIn(Object.values(TimeSlot))
      .withMessage(`timeSlot should be ${Object.values(TimeSlot)}`),
    body('division')
      .notEmpty()
      .withMessage('division should not be empty')
      .isIn(Object.values(Division))
      .withMessage(`division should be ${Object.values(Division)}`),
    body('doctorId')
      .notEmpty()
      .withMessage('doctorId should not be empty')
      .isString()
      .withMessage('doctorId should be string'),
    body('canReverse')
      .optional({ nullable: true })
      .isBoolean()
      .withMessage('canReverse should be boolean'),
    body('totalNo')
      .optional({ nullable: true })
      .isNumeric()
      .withMessage('totalNo should be number'),
    body('types')
      .optional({ nullable: true })
      .isArray()
      .withMessage('types should be array')
      .custom((types: any[]) => {
        return types.every(type => Object.values(ReservationType).includes(type))
      })
      .withMessage(`types should be ${Object.values(ReservationType)} array`),
  ],
  reservation: [
    body('reservationDetailId')
      .notEmpty()
      .withMessage('reservationDetailId should not be empty')
      .isNumeric()
      .withMessage('reservationDetailId should be number'),
    body('patientId')
      .notEmpty()
      .withMessage('patientId should not be empty')
      .isNumeric()
      .withMessage('patientId should be number'),
    body('note')
      .optional({ nullable: true })
      .isString()
      .withMessage('note should be string'),
    body('from')
      .notEmpty()
      .withMessage('from should not be empty')
      .isIn(Object.values(ReservationFrom))
      .withMessage(`from should be ${Object.values(ReservationFrom)}`),
  ],
  getReservation: [
    param('year')
      .notEmpty()
      .withMessage('year should not be empty')
      .isNumeric()
      .withMessage('year should be number'),
    param('month')
      .notEmpty()
      .withMessage('month should not be empty')
      .isNumeric()
      .withMessage('month should be number'),
  ],
  updateReservationType: [
    param('reservationDetailId')
      .notEmpty()
      .withMessage('reservationDetailId should not be empty')
      .isNumeric()
      .withMessage('reservationDetailId should be number'),
    param('type')
      .notEmpty()
      .withMessage('type should not be empty')
      .isIn(Object.values(ReservationType))
      .withMessage(`type should be ${Object.values(ReservationType)}`),
  ],
};
