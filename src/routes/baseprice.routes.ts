
import { basePriceAddEdit, basePriceDelete, basePriceListing, getBasePriceById } from "../controllers/baseprice.controller";
import authMiddleware from "../middleware/auth.middleware";

const express = require("express");
const router = express.Router();

router.post("/listing",authMiddleware,basePriceListing);  // 🔐 protected
router.post("/addedit",authMiddleware,basePriceAddEdit);  // 🔐 protected
router.post("/delete",authMiddleware,basePriceDelete);  // 🔐 protected
router.post("/getbyID",authMiddleware,getBasePriceById);  // 🔐 protected

export default router; 