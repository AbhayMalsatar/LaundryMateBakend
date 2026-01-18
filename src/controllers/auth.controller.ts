import { NextFunction, Request, Response } from "express";
import { loginUser, registerUserService, requestOtpManager } from "../services/auth.service";
import { loginInput, registerUserInput, requestOtpInput } from "../DTO/auth.dto";
import ApiResponse from "../utils/ApiResponse";

export const login = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { mobileno, password } = loginInput.parse(req.body);
    const data = await loginUser(mobileno, password);
    ApiResponse.success(res, {
      message: "Login successful",
      token: data.token
    });
  } catch (error: any) {
    next(error);
  }
};

export const requestOtp = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { mobileno } = requestOtpInput.parse(req.body);

    const otp = await requestOtpManager(mobileno);
    if (otp) {
      ApiResponse.success(res, {
        message: "OTP sent successfully",
      });
    } else {
      ApiResponse.error(res, {
        message: "OTP generation failed",
        statusCode: 500,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password, mobile, otp } = registerUserInput.parse(req.body);

    const isUserRegistered = await registerUserService(username, email, password, mobile, otp);
    if (!isUserRegistered.isValid) {
      ApiResponse.error(res, {
        message: isUserRegistered.message,
        statusCode: 400,
      });
      return;
    }
    ApiResponse.success(res, {
      message: "User registered successfully",
    });
  } catch (err) {
    next(err);
  }
};