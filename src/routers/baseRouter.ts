import express from 'express';
import { validatorProcess } from '../validators/validatorProcess';
import { myResult } from '../utils/errorMessage';

export enum Method {
  POST = 'post',
  GET = 'get',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete'
}

export default abstract class BaseRouter {
  protected readonly router: express.Router;

  constructor() {
    this.router = express.Router();
    this.init();
    this.mountRoutes();
  }

  protected init() { }
  protected mountRoutes() { }

  protected route(method: Method, path: string, handler: any, validateRules: any) {
    this.router[method](
      path,
      validateRules,
      validatorProcess,
      async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
          res.send(myResult(await handler.call(this, req, res)));
        } catch (error) {
          next(error);
        }
      });
  }

  expressRouter() {
    return this.router;
  }
}