import { Response } from "express";

interface SuccessResponse<T = unknown> {
  statusCode?: number;
  token?: string;
  totalRecords?: number;
  message?: string;
  data?: T | null;
  meta?: unknown | null;
}

interface ErrorResponse {
  statusCode?: number;
  message?: string;
  errors?: unknown | null;
}

class ApiResponse {
  static success<T>(res: Response, options: SuccessResponse<T>) {
    const {
      statusCode = 200,
      message = "Success",
      data = null,
      meta = null,
      token = null,
      ...rest
    } = options;

    return res.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
      meta,
      token,
      ...rest,
    });
  }

  static error(res: Response, options: ErrorResponse) {
    const {
      statusCode = 500,
      message = "Something went wrong",
      errors = null,
    } = options;

    return res.status(statusCode).json({
      statusCode,
      success: false,
      message,
      errors,
    });
  }
}

export default ApiResponse;
