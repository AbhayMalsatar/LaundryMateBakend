import { clothTypeAddEdit, clothTypeDelete, clothTypeGetByID, clothTypeListing } from "../controllers/clothtypes.controller";
import authMiddleware from "../middleware/auth.middleware";

const express = require("express");
const router = express.Router();

router.post("/listing",authMiddleware,clothTypeListing);  // 🔐 protected
router.post("/addedit",authMiddleware,clothTypeAddEdit);  // 🔐 protected
router.post("/delete",authMiddleware,clothTypeDelete);  // 🔐 protected
router.post("/getbyID",authMiddleware,clothTypeGetByID);  // 🔐 protected


export default router; 