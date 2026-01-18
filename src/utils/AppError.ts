export default class AppError extends Error {
  public statusCode: number;
  public errors?: unknown;
  public isOperational: boolean;

  constructor(message: string, statusCode = 400, errors?: unknown) {
    super(message);

    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
