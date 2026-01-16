import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByMobileNo } from "../repositories/user.repository";
import { pool } from "../config/connection";
const { Vonage } = require('@vonage/server-sdk')
import { v4 as uuidv4 } from "uuid";


export const loginUser = async (mobileno: string, password: string) => {
  const user = await findUserByMobileNo(mobileno);
  if (!user) throw new Error("Your Mobile Number is not registered!");
  const isValid = await bcrypt.compare(password, user.get("passwordhash") as string);
  if (!isValid) throw new Error("Wrong Password!");

  const token = jwt.sign(
    {
      userId: user.get("userid"),
      roleId: user.get("roleid")
    },
    process.env.JWT_SECRET as string,
    { expiresIn: parseInt(process.env.JWT_EXPIRES_IN || "3600", 10) }
  );

  return { token };
};

export const requestOtpManager = async (mobileno: string) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 90000).toString();
    const expiresAt = 5
    const vonage = new Vonage({
      apiKey: process.env.VONGO_API_KEY,
      apiSecret: process.env.VONGO_API_SECRET
    })

    const from = "Laundry Mate";
    const to = "91" + mobileno;
    const text = `Your OTP code is ${otp}. It is valid for 5 minutes.`;


    const smsResponse = await vonage.sms.send({ to, from, text });

    await pool.query(
      "CALL auth_otp_add($1, $2, $3)",
      [mobileno, otp, expiresAt]
    );
    return otp;
  } catch (error) {
    throw error;
  }

}

export const verifyOtpManager = async (mobileno: string, otp: string) => {
  try {
    const result = await pool.query(
      "CALL auth_otp_verify($1, $2, $3, $4)",
      [mobileno, otp, null, null]
    );
    const { p_is_valid, p_message } = result.rows[0];
    return { isValid: p_is_valid, message: p_message };
  } catch (err) {
    throw err;
  }
}

export const registerUserService = async (username: string, email: string, password: string, mobileno: string, otp: string) => {
  try {
    const otpVerify = await verifyOtpManager(mobileno, otp);
    if (!otpVerify.isValid) {
      return {isValid : false, message: otpVerify.message };
    }
    //🔐 Hash passwordHash
    const passwordHash = await bcrypt.hash(password, 10);

    const roleId = 2;
    const addBy = null; // system / admin user
    const res = await pool.query(
      `CALL public.authusers_addedit($1,$2,$3,$4,$5,$6,$7,NULL,NULL,NULL)`,
      [
        null,
        username,
        email,
        passwordHash,
        roleId,
        mobileno,
        addBy
      ]
    );

    const { o_userid, isvalid, message } = res.rows[0];

    if (!isvalid) {
      return { isValid: false, message };
    }
    return { isValid: true, message: "User registered successfully" };
  } catch (err) {
    throw err;
  }
}