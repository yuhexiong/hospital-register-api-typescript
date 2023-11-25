export class MyError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export const myResult = <T>(results: T): { results: T } => {
  return {
    results
  };
};

export const myErrorMessage = (error: MyError): any => {
  return {
    message: error.message
  }
}