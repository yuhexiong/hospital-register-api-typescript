import express from 'express';
import PatientController from '../controllers/patientController';
import patientRule from '../rules/patientRule';
import BaseRouter, { Method } from './baseRouter';

export default class PatientRouter extends BaseRouter {
  protected mountRoutes() {
    super.route(Method.POST, '/patient', this.handleCreatePatient, patientRule.createPatient);
    super.route(Method.GET, '/patient/name/:name', this.handleGetPatientByName, patientRule.getPatientByName);
    super.route(Method.GET, '/patient/:id', this.handleGetPatientById, patientRule.getPatientById);
    super.route(Method.GET, '/patients', this.handleGetAllPatients, patientRule.getAllPatients);
    super.route(Method.PUT, '/patient/:id', this.handleUpdatePatient, patientRule.updatePatient);
    super.route(Method.DELETE, '/patient/:id', this.handleDeletePatient, patientRule.deletePatient);
  }

  /**
   * @typedef { object } patientEntity
   * @property { string } name.required - 姓名
   * @property { string } birthday - 生日, YYYY-MM-DD
   * @property { string } gender - 性別 - M, F, X
   * @property { string } email - 電子郵件
   * @property { string } phone - 電話
   */

  /**
   * POST /patient
   * @summary 新增一位病人
   * @tags patient 病人
   * @param { patientEntity } request.body.required
   * @return { object } 200 - success - application/json
   * @example response - 200 - success
   * {
   *    "code": 0,
   *    "results": {}
   * }
   */
  private async handleCreatePatient(req: express.Request, res: express.Response, next: express.NextFunction) {
    return await PatientController.createPatient(
      {
        name: req.body.name,
        birthday: req.body.birthday,
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone,
      }
    );
  }

  /**
   * GET /patient/name/{name}
   * @summary 由姓名取得符合的病人, 支援正規表達式搜尋
   * @tags patient 病人
   * @param { string } name.param.required - 姓名
   * @return { patientEntity[] } 200 - success - application/json
   * @example response - 200 - success
   * {
   *    "code": 0,
   *    "results": [
   *      {
   *        "id": 1,
   *        "name": "陳小明",
   *        "birthday": "1998-11-11",
   *        "gender": "M",
   *        "email": "ming@email.com",
   *        "phone": "0900000000"
   *      }
   *    ]
   * }
   */
  private async handleGetPatientByName(req: express.Request, res: express.Response, next: express.NextFunction) {
    return await PatientController.getPatientByName(req.params.name);
  }

  /**
   * GET /patient/{id}
   * @summary 由id取得一位病人
   * @tags patient 病人
   * @param { number } id.param.required - 病人id
   * @return { patientEntity } 200 - success - application/json
   * @example response - 200 - success
   * {
   *    "code": 0,
   *    "results": {
   *      "id": 1,
   *      "name": "陳小明",
   *      "birthday": "1998-11-11",
   *      "gender": "M",
   *      "email": "ming@email.com",
   *      "phone": "0900000000"
   *    }
   * }
   */
  private async handleGetPatientById(req: express.Request, res: express.Response, next: express.NextFunction) {
    return await PatientController.getPatientById(Number(req.params.id));
  }

  /**
   * GET /patients
   * @summary 取得所有病人
   * @tags patient 病人
   * @param { number } id.param.required - 病人id
   * @return { patientEntity[] } 200 - success - application/json
   * @example response - 200 - success
   * {
   *    "code": 0,
   *    "results": [
   *      {
   *        "id": 1,
   *        "name": "陳小明",
   *        "birthday": "1998-11-11",
   *        "gender": "M",
   *        "email": "ming@email.com",
   *        "phone": "0900000000"
   *      }
   *    ]
   * }
   */
  private async handleGetAllPatients(req: express.Request, res: express.Response, next: express.NextFunction) {
    return await PatientController.getAllPatients();
  }

  /**
   * @typedef { object } updatePatient
   * @property { string } name - 姓名
   * @property { string } birthday - 生日, YYYY-MM-DD
   * @property { string } gender - 性別 - M, F, X
   * @property { string } email - 電子郵件
   * @property { string } phone - 電話
   */

  /**
   * PUT /patient/{id}
   * @summary 修改一位病人
   * @tags patient 病人
   * @param { number } id.param.required - 病人id
   * @param { updatePatient } request.body.required
   * @return { object } 200 - success - application/json
   * @example response - 200 - success
   * {
   *    "code": 0,
   *    "results": {}
   * }
   */
  private async handleUpdatePatient(req: express.Request, res: express.Response, next: express.NextFunction) {
    return await PatientController.updatePatient(
      Number(req.params.id),
      {
        name: req.body.name,
        birthday: req.body.birthday,
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone,
      }
    );
  }

  /**
   * DELETE /patient/{id}
   * @summary 刪除一位病人
   * @tags patient 病人
   * @param { number } id.param.required - 病人id
   * @return { object } 200 - success - application/json
   * @example response - 200 - success
   * {
   *    "code": 0,
   *    "results": {}
   * }
   */
  private async handleDeletePatient(req: express.Request, res: express.Response, next: express.NextFunction) {
    return await PatientController.deletePatient(Number(req.params.id));
  }

}