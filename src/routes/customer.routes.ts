import { customerAddEdit, customerDelete, customerGetById, customerListing } from "../controllers/customer.controller";
import authMiddleware from "../middleware/auth.middleware";

const express = require("express");
const router = express.Router();

router.post("/listing",authMiddleware,customerListing);  // 🔐 protected
router.post("/addedit",authMiddleware,customerAddEdit);  // 🔐 protected
router.post("/delete",authMiddleware,customerDelete);  // 🔐 protected
router.post("/getbyID",authMiddleware,customerGetById);  // 🔐 protected



export default router;