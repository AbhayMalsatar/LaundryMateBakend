import { Router } from "express";
import { login, registerUser, requestOtp } from "../controllers/auth.controller";

const router = Router();

router.post("/login", login);
router.post("/requestotp", requestOtp);
router.post("/register", registerUser);

export default router;
