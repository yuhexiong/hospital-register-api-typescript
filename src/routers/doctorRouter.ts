import express from 'express';
import DoctorController from '../controllers/doctorController';
import doctorRule from '../rules/doctorRule';
import BaseRouter, { Method } from './baseRouter';

export default class DoctorRouter extends BaseRouter {
  protected mountRoutes() {
    super.route(Method.POST, '/doctor', this.handleCreateDoctor, doctorRule.createDoctor);
    super.route(Method.GET, '/doctor/:id', this.handleGetDoctor, doctorRule.getDoctor);
    super.route(Method.GET, '/doctors', this.handleGetAllDoctors, doctorRule.getAllDoctors);
    super.route(Method.PATCH, '/doctor/:id/:name', this.handleUpdateDoctorName, doctorRule.updateDoctor);
  }

  /**
   * @typedef { object } doctorEntity
   * @property { string } id.required - 醫師工號
   * @property { string } name.required - 姓名
   */

  /**
   * POST /doctor
   * @summary 新增一位醫師
   * @tags doctor 醫師
   * @param { doctorEntity } request.body.required
   * @return { object } 200 - success - application/json
   * @example response - 200 - success
   * {
   *    "code": 0,
   *    "results": {}
   * }
   */
  private async handleCreateDoctor(req: express.Request, res: express.Response, next: express.NextFunction) {
    return await DoctorController.createDoctor(
      {
        id: req.body.id,
        name: req.body.name
      }
    );
  }

  /**
   * GET /doctor/{id}
   * @summary 由id取得一位醫師
   * @tags doctor 醫師
   * @param { string } id.param.required - 醫師工號
   * @return { doctorEntity } 200 - success - application/json
   * @example response - 200 - success
   * {
   *    "code": 0,
   *    "results": {
   *      "id": "03000",
   *      "name": "林零零"
   *    }
   * }
   */
  private async handleGetDoctor(req: express.Request, res: express.Response, next: express.NextFunction) {
    return await DoctorController.getDoctor(req.params.id);
  }

  /**
   * GET /doctors
   * @summary 取得所有醫師
   * @tags doctor 醫師
   * @param { string } id.param.required - 醫師工號
   * @return { doctorEntity[] } 200 - success - application/json
   * @example response - 200 - success
   * {
   *    "code": 0,
   *    "results": [
   *      {
   *        "id": "03000",
   *        "name": "林零零"
   *      }
   *    ]
   * }
   */
  private async handleGetAllDoctors(req: express.Request, res: express.Response, next: express.NextFunction) {
    return await DoctorController.getAllDoctors();
  }

  /**
   * PATCH /doctor/{id}
   * @summary 修改一位醫師
   * @tags doctor 醫師
   * @param { string } id.param.required - 醫師工號
   * @param { string } name.name.required - 姓名
   * @return { object } 200 - success - application/json
   * @example response - 200 - success
   * {
   *    "code": 0,
   *    "results": {}
   * }
   */
  private async handleUpdateDoctorName(req: express.Request, res: express.Response, next: express.NextFunction) {
    return await DoctorController.updateDoctorName(req.params.id, req.params.name);
  }

}