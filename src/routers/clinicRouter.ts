import express from 'express';
import ClinicController from '../controllers/clinicController';
import clinicRule from '../rules/clinicRule';
import BaseRouter, { Method } from './baseRouter';

export default class ClinicRouter extends BaseRouter {
  protected mountRoutes() {
    super.route(Method.POST, '/clinic/register', this.handleRegister, clinicRule.register);
    super.route(Method.GET, '/clinic/:id', this.handleGetClinic, clinicRule.getClinic);
    super.route(Method.POST, '/clinic/start/:id', this.handleStartClinic, clinicRule.start);
    super.route(Method.PATCH, '/clinic/:id', this.handleUpdateSoap, clinicRule.updateSoap);
    super.route(Method.POST, '/clinic/finish/:id', this.handleFinishClinic, clinicRule.finish);
    super.route(Method.POST, '/clinic/paid/:id', this.handleClinicPaid, clinicRule.paid);
    super.route(Method.POST, '/clinic/unregister/:id', this.handleUnregisterClinic, clinicRule.unregister);
    super.route(Method.GET, '/clinic/patient/:patientId', this.handleGetClinicByPatient, clinicRule.getClinicByPatient);
  }

  /**
   * @typedef { object } register
   * @property { number } reservationDetailId.required - 預約細項id
   * @property { string } date.required - 門診日期, YYYY-MM-DD
   * @property { boolean } isNhi.required - 是否掛健保, true=健保, false=自費
   * @property { boolean } hasIcCard - 是否有健保卡
   * @property { string } cardExceptionCode - 卡片異常代碼
   * @property { string } medicalType - 就醫類別
   * @property { string } medicalNumber - 就醫序號
   * @property { string } caseType - 案件別
   * @property { number } patientId.required - 病人id
   * @property { number } payableAmount.required - 應繳金額
   * @property { number } paidAmount - 已繳金額
   */

  /**
   * POST /clinic/register
   * @summary 掛號
   * @tags clinic 門診
   * @param { register } request.body.required
   * @return { object } 200 - success - application/json
   * @example response - 200 - success
   * {
   *    "code": 0,
   *    "results": {}
   * }
   */
  private async handleRegister(req: express.Request, res: express.Response, next: express.NextFunction) {
    return await ClinicController.register(
      {
        reservationDetailId: req.body.reservationDetailId,
        date: req.body.date,
        isNhi: req.body.isNhi,
        hasIcCard: req.body.hasIcCard,
        cardExceptionCode: req.body.cardExceptionCode,
        medicalType: req.body.medicalType,
        medicalNumber: req.body.medicalNumber,
        caseType: req.body.caseType,
        patientId: req.body.patientId,
        payableAmount: req.body.payableAmount,
        paidAmount: req.body.paidAmount,
      }
    );
  }

  /**
   * @typedef { object } clinicEntity
   * @property { number } reservationDetailId.required - 預約細項id
   * @property { string } date.required - 門診日期, YYYY-MM-DD
   * @property { string } beginTime - 開始看診時間
   * @property { string } finishTime - 完診時間
   * @property { boolean } isNhi.required - 是否掛健保, true=健保, false=自費
   * @property { boolean } hasIcCard.required - 是否有健保卡
   * @property { string } cardExceptionCode - 卡片異常代碼
   * @property { string } medicalType - 就醫類別
   * @property { string } medicalNumber - 就醫序號
   * @property { string } caseType - 案件別
   * @property { string } doctorId.required - 醫師工號
   * @property { number } patientId.required - 病人id
   * @property { string } soap.required - soap
   * @property { string } status.required - 門診狀態 - REGISTER, CLINIC, COMPLETE, PAID, UNREGISTER
   * @property { number } payableAmount.required - 應繳金額
   * @property { number } paidAmount - 已繳金額
   */

  /**
   * GET /clinic/{id}
   * @summary 由id取得門診
   * @tags clinic 門診
   * @param { number } id.param.required - 門診id
   * @return { clinicEntity } 200 - success - application/json
   * @example response - 200 - success
   * {
   *    "code": 0,
   *    "results": {
   *      "id": 1,
   *      "reservationDetailId": 2,
   *      "date": "2023-11-28",
   *      "beginTime": "2023-11-28T13:41:23.000Z",
   *      "finishTime": null,
   *      "isNhi": true,
   *      "hasIcCard": false,
   *      "cardExceptionCode": null,
   *      "medicalType": "01",
   *      "medicalNumber": null,
   *      "caseType": null,
   *      "doctorId": "03000",
   *      "patientId": 1,
   *      "soap": "test",
   *      "status": "CLINIC",
   *      "payableAmount": 200,
   *      "paidAmount": 0
   *    }
   * }
   */
  private async handleGetClinic(req: express.Request, res: express.Response, next: express.NextFunction) {
    return await ClinicController.getClinic(Number(req.params.id));
  }

  /**
   * POST /clinic/start/{id}
   * @summary 開始看診或重新看診
   * @tags clinic 門診
   * @param { number } id.param.required - 門診id
   * @return { object } 200 - success - application/json
   * @example response - 200 - success
   * {
   *    "code": 0,
   *    "results": {}
   * }
   */
  private async handleStartClinic(req: express.Request, res: express.Response, next: express.NextFunction) {
    return await ClinicController.start(Number(req.params.id));
  }

  /**
   * @typedef { object } updateSoap
   * @property { string } soap.required - soap
   */

  /**
   * PATCH /clinic/{id}
   * @summary 更新主訴與觀察
   * @tags clinic 門診
   * @param { number } id.param.required - 門診id
   * @param { updateSoap } request.body.required
   * @return { object } 200 - success - application/json
   * @example response - 200 - success
   * {
   *    "code": 0,
   *    "results": {}
   * }
   */
  private async handleUpdateSoap(req: express.Request, res: express.Response, next: express.NextFunction) {
    return await ClinicController.updateSoap(Number(req.params.id), req.body.soap);
  }

  /**
   * POST /clinic/finish/{id}
   * @summary 完診
   * @tags clinic 門診
   * @param { number } id.param.required - 門診id
   * @return { object } 200 - success - application/json
   * @example response - 200 - success
   * {
   *    "code": 0,
   *    "results": {}
   * }
   */
  private async handleFinishClinic(req: express.Request, res: express.Response, next: express.NextFunction) {
    return await ClinicController.finish(Number(req.params.id));
  }

  /**
   * @typedef { object } paid
   * @property { boolean } isNhi - 是否掛健保, true=健保, false=自費
   * @property { boolean } hasIcCard - 是否有健保卡
   * @property { string } cardExceptionCode - 卡片異常代碼
   * @property { string } medicalType - 就醫類別
   * @property { string } medicalNumber - 就醫序號
   * @property { string } caseType - 案件別
   * @property { number } payableAmount - 應繳金額
   * @property { number } paidAmount - 已繳金額
   */

  /**
   * POST /clinic/paid/{id}
   * @summary 批價繳費
   * @tags clinic 門診
   * @param { number } id.param.required - 門診id
   * @param { paid } request.body.required
   * @return { object } 200 - success - application/json
   * @example response - 200 - success
   * {
   *    "code": 0,
   *    "results": {}
   * }
   */
  private async handleClinicPaid(req: express.Request, res: express.Response, next: express.NextFunction) {
    return await ClinicController.paid(
      Number(req.params.id),
      {
        isNhi: req.body.isNhi,
        hasIcCard: req.body.hasIcCard,
        cardExceptionCode: req.body.cardExceptionCode,
        medicalType: req.body.medicalType,
        medicalNumber: req.body.medicalNumber,
        caseType: req.body.caseType,
        payableAmount: req.body.payableAmount,
        paidAmount: req.body.paidAmount,
      }
    );
  }

  /**
   * POST /clinic/unregister/{id}
   * @summary 退掛
   * @tags clinic 門診
   * @param { number } id.param.required - 門診id
   * @return { object } 200 - success - application/json
   * @example response - 200 - success
   * {
   *    "code": 0,
   *    "results": {}
   * }
   */
  private async handleUnregisterClinic(req: express.Request, res: express.Response, next: express.NextFunction) {
    return await ClinicController.unregister(Number(req.params.id));
  }

  /**
   * @typedef { object } getClinicByPatient
   * @property { number } reservationDetailId.required - 預約細項id
   * @property { string } date.required - 門診日期, YYYY-MM-DD
   * @property { string } beginTime - 開始看診時間
   * @property { string } finishTime - 完診時間
   * @property { boolean } isNhi.required - 是否掛健保, true=健保, false=自費
   * @property { boolean } hasIcCard.required - 是否有健保卡
   * @property { string } cardExceptionCode - 卡片異常代碼
   * @property { string } medicalType - 就醫類別
   * @property { string } medicalNumber - 就醫序號
   * @property { string } caseType - 案件別
   * @property { string } doctorId.required - 醫師工號
   * @property { number } patientId.required - 病人id
   * @property { string } soap.required - soap
   * @property { string } status.required - 門診狀態 - REGISTER, CLINIC, COMPLETE, PAID, UNREGISTER
   * @property { number } payableAmount.required - 應繳金額
   * @property { number } paidAmount - 已繳金額
   * @property { boolean } hasArrears.required - 是否有欠款
   */

  /**
   * GET /clinic/patient/{patientId}
   * @summary 取得指定病人指定區間所有門診, 並顯示是否有欠款
   * @tags clinic 門診
   * @param { number } patientId.param.required - 病患id
   * @param { string } startDate.query - 起始日期, YYYY-MM-DD
   * @param { string } endDate.query - 結束日期, YYYY-MM-DD
   * @return { getClinicByPatient[] } 200 - success - application/json
   * @example response - 200 - success
   * {
   *    "code": 0,
   *    "results": {
   *      "id": 1,
   *      "reservationDetailId": 2,
   *      "date": "2023-11-28",
   *      "beginTime": "2023-11-28T13:41:23.000Z",
   *      "finishTime": null,
   *      "isNhi": true,
   *      "hasIcCard": false,
   *      "cardExceptionCode": null,
   *      "medicalType": "01",
   *      "medicalNumber": null,
   *      "caseType": null,
   *      "doctorId": "03000",
   *      "patientId": 1,
   *      "soap": "test",
   *      "status": "CLINIC",
   *      "payableAmount": 200,
   *      "paidAmount": 200,
   *      "hasArrears": false
   *    }
   * }
   */
  private async handleGetClinicByPatient(req: express.Request, res: express.Response, next: express.NextFunction) {
    return await ClinicController.getClinicByPatient(
      Number(req.params.patientId),
      req.query.startDate as string,
      req.query.endDate as string
    );
  }
}