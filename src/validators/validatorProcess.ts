import express from 'express';
import { validationResult } from 'express-validator';
import { MyError } from '../utils/errorMessage';

export const validatorProcess = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    const message = validationResult(req).array()[0].msg;
    throw new MyError(message);
  }

  next();
};