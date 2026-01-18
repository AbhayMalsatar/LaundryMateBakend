import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import ApiResponse from "../utils/ApiResponse";
import AppError from "../utils/AppError";
import formatZodError from "../utils/FormatZodError";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /* -------------------- ZOD VALIDATION ERROR -------------------- */
  if (err instanceof ZodError) {
    return ApiResponse.error(res, {
      statusCode: 422,
      message: err.issues[0]?.message || "Validation error",
      errors: formatZodError(err),
    });
  }

  /* -------------------- CUSTOM APP ERROR -------------------- */
  if (err instanceof AppError && err.isOperational) {
    return ApiResponse.error(res, {
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors ?? null,
    });
  }

  /* -------------------- UNKNOWN / SYSTEM ERROR -------------------- */
  console.error("❌ UNHANDLED ERROR:", err);

  return ApiResponse.error(res, {
    statusCode: 500,
    message: "Internal server error",
  });
};

export default errorMiddleware;
