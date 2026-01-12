import { Request, Response } from "express";
import { loginUser, registerUserService, requestOtpManager } from "../services/auth.service";

export const login = async (req: Request, res: Response) => {
  try {
    const { mobileno, password } = req.body;
    console.log(mobileno, password);
    if (!mobileno || !password) {
      return res.status(400).json({ success: false, message: "Mobile number and password are required" });
    }
    const data = await loginUser(mobileno, password);
    res.status(200).json({
      success: true,
      message: "Login successful",
      token: data.token
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message
    });

  }
};

export const requestOtp = async (req: Request, res: Response) => {
  try {
    const { mobileno } = req.body;

    if (!mobileno) {
      return res.status(400).json({ message: "Mobile number required" });
    }
    const otp = await requestOtpManager(mobileno);
    if (otp) {
      res.json({
        success: true,
        message: "OTP sent successfully",
      });
    } else {
      res.status(500).json({ message: "OTP generation failed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "OTP generation failed" });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, mobile, otp } = req.body;
    console.log(req.body)
    if (!username || !email || !password || !mobile || !otp) {
      return res.status(400).json({ message: "All fields required" });
    }

    const isUserRegistered = await registerUserService(username, email, password, mobile, otp);
    if (!isUserRegistered.isValid) {
      return res.status(400).json({ message: isUserRegistered.message });
    }
    console.log("isUserRegistered", isUserRegistered);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err});
  }
};