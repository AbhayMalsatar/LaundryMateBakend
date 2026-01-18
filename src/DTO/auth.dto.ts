import { z } from "zod";

const loginInput = z.object({
    mobileno: z.string("Mobile number is required").min(10, "Mobile number must be at least 10 digits long"),
    password: z.string("Password is required")
});

const requestOtpInput = z.object({
    mobileno: z.string("Mobile number is required").min(10, "Mobile number must be at least 10 digits long")
});

const registerUserInput = z.object({
    username: z.string("Username is required").min(1, "Username is required"),
    email: z.email("Email is required").min(1, "Email is required"),
    password: z.string("Password is required"),
    mobile: z.string("Mobile number is required").min(10, "Mobile number must be at least 10 digits long"),
    otp: z.string("OTP is required").min(4, "OTP must be at least 4 digits long")
});

export { loginInput, requestOtpInput, registerUserInput };