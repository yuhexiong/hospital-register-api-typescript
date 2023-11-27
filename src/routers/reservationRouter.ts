import express from 'express';
import ReservationController from '../controllers/reservationController';
import reservationRule from '../rules/reservationRule';
import { Division, ReservationFrom, ReservationType, TimeSlot } from '../utils/enum';
import BaseRouter, { Method } from './baseRouter';

export default class ReservationRouter extends BaseRouter {
  protected mountRoutes() {
    super.route(Method.POST, '/reservation/list', this.handleCreateReservationList, reservationRule.createReservationList);
    super.route(Method.POST, '/reservation', this.handleReservation, reservationRule.reservation);
    super.route(Method.GET, '/reservation/:year/:month', this.handleGetReservation, reservationRule.getReservation);
    super.route(Method.PATCH, '/reservation/:reservationDetailId/:type', this.handleUpdateReservationType, reservationRule.updateReservationType);
  }

  /**
   * @typedef { object } createReservationListOption
   * @property { string } date.required - 日期
   * @property { TimeSlot } timeSlot.required - 時段別 - morning, afternoon, evening
   * @property { Division } division.required - 科別 - 00, 01, 02...
   * @property { string } doctorId.required - 醫師工號
   * @property { boolean } canReverse - 是否可以預約, 預設true
   * @property { number } totalNo - 總預約號, 預設50
   * @property { ReservationType[] } types - 給號類別, 不足總預約號則依是否可預約補足現場號或預約號 - [onSite, reverse, all, not]
   */

  /**
   * POST /reservation/list
   * @summary 新增一張預約班表
   * @tags reservation 預約
   * @param { createReservationListOption } request.body.required
   * @return { object } 200 - success - application/json
   * @example response - 200 - success
   * {
   *    "code": 0,
   *    "results": {}
   * }
   */
  private async handleCreateReservationList(req: express.Request, res: express.Response, next: express.NextFunction) {
    return await ReservationController.createReservationList(
      {
        date: req.body.date,
        timeSlot: req.body.timeSlot,
        division: req.body.division,
        doctorId: req.body.doctorId,
        canReverse: req.body.canReverse,
        totalNo: req.body.totalNo,
        types: req.body.types,
      }
    );
  }

  /**
   * @typedef { object } reservationOption
   * @property { number } reservationDetailId.required - 預約子表id
   * @property { number } patientId.required - 病人id
   * @property { string } note - 註記
   * @property { ReservationFrom } from.required - 預約來源, onSite=現場, net=網路
   */

  /**
   * POST /reservation
   * @summary 預約門診
   * @tags reservation 預約
   * @param { reservationOption } request.body.required
   * @return { object } 200 - success - application/json
   * @example response - 200 - success
   * {
   *    "code": 0,
   *    "results": {}
   * }
   */
  private async handleReservation(req: express.Request, res: express.Response, next: express.NextFunction) {
    return await ReservationController.reservation(
      {
        reservationDetailId: req.body.reservationDetailId,
        patientId: req.body.patientId,
        note: req.body.note,
        from: req.body.from,
      }
    );
  }

  /**
   * GET /reservation
   * @summary 取得指定月分所有預約班表
   * @tags reservation 預約
   * @param { number } year.param.required - 年份
   * @param { number } month.param.required - 月份
   * @return { object[] } 200 - success - application/json
   * @example response - 200 - success
   * {
   *    "code": 0,
   *    "results": [
   *      {
   *      }
   *    ]
   * }
   */
  private async handleGetReservation(req: express.Request, res: express.Response, next: express.NextFunction) {
    return await ReservationController.getReservation(Number(req.params.year), Number(req.params.month));
  }

  /**
   * PATCH /reservation/{reservationDetailId}/{type}
   * @summary 修改預約給號類別
   * @tags reservation 預約
   * @param { string } reservationDetailId.param.required - 預約子表id
   * @param { ReservationType } type.param.required - 給號類別 - onSite, reverse, all, not
   * @return { object } 200 - success - application/json
   * @example response - 200 - success
   * {
   *    "code": 0,
   *    "results": {}
   * }
   */
  private async handleUpdateReservationType(req: express.Request, res: express.Response, next: express.NextFunction) {
    return await ReservationController.updateReservationType(
      Number(req.params.reservationDetailId),
      req.params.type as ReservationType
    );
  }

}