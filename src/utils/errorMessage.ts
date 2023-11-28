export class MyError extends Error {
  static INSUFFICIENT_DATA = '000107';
  static INVALID_PARAMETER = '000108';
  static COLUMN_MISMATCH = '000109';

  static INVALID_TYPE_RESERVATION = '000120';
  static INVALID_STATUS_CLINIC = '000121';

  code: number | string;

  constructor(code: number | string, message: string) {
    super(message);
    this.code = code;
  }
}

export const myResult = <T>(results: T): { code: number, results: T } => {
  return {
    code: 0,
    results
  };
};

export const myErrorMessage = (error: MyError): any => {
  return {
    code: error.code,
    message: error.message
  }
}