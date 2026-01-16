import { serviceAddEdit, serviceDelete, serviceGetByID, serviceListing } from "../controllers/services.controller";
import authMiddleware from "../middleware/auth.middleware";

const express = require("express");
const router = express.Router();

router.post("/listing",authMiddleware,serviceListing);  // 🔐 protected
router.post("/addedit",authMiddleware,serviceAddEdit);  // 🔐 protected
router.post("/delete",authMiddleware,serviceDelete);  // 🔐 protected
router.post("/getbyID",authMiddleware,serviceGetByID);  // 🔐 protected


export default router; 