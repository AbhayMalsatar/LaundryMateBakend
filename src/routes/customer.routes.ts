import { customerAddEdit, customerDelete, customerGetById, customerListing } from "../controllers/customer.controller";
import authMiddleware from "../middleware/auth.middleware";

const express = require("express");
const router = express.Router();

router.post("/customers/list",authMiddleware,customerListing);  // 🔐 protected
router.post("/customers/addedit",authMiddleware,customerAddEdit);  // 🔐 protected
router.post("/customers/delete",authMiddleware,customerDelete);  // 🔐 protected
router.post("/customers/getbyID",authMiddleware,customerGetById);  // 🔐 protected



export default router;