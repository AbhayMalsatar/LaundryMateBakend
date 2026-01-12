const pool = require("../db");
import { Request, Response } from "express";
import { addEditCustomerService, deleteCustomerService, getCustomerByIdService, getCustomerListingService } from "../services/customer.service";

// Customer Listing
export const customerListing = async (req: Request, res: Response) => {
    try {
        const { pageSize = null, pageNo = null, search = null, sortBy = "adddate desc" }: any = req.body ?? {};
        const result = await getCustomerListingService(pageSize, pageNo, search, sortBy);
        res.status(200).json({
            success: true,
            totalRecords: result.rowCount,
            data: result.rows,
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch customers",
        });
    }
};

// Customer Add/Edit
export const customerAddEdit = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.user_id; // from JWT
        const { customerId = null, customerName, customerShortName = null, mobileNo = null, email = null, address1 = null, address2 = null, city = null, zipCode = null, note = null, image = null } = req.body;
        if (!customerName) {
            return res.status(400).json({ success: false, message: "Customer name is required" });
        }
        const result = await addEditCustomerService(
            userId,
            customerId,
            customerName,
            customerShortName,
            mobileNo,
            email,
            address1,
            address2,
            city,
            zipCode,
            note,
            image
        );
        res.status(200).json({
            success: true,
            message: result,
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to Add or Edit customers",
        });
    }
};

// Customer Delete
export const customerDelete = async (req: Request, res: Response) => {
    try {
        const { customerId } = req.body;
        if (!customerId) {
            return res.status(400).json({ success: false, message: "Customer ID is required" });
        }
        const result = await deleteCustomerService(customerId);
        res.status(200).json({
            success: true,
            message: result,
        });

    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to delete customer",
        });
    }
};

export const customerGetById = async (req: Request, res: Response) => {
    try {
        const { customerId } = req.body;
        if (!customerId) {
            return res.status(400).json({ success: false, message: "Customer ID is required" });
        }
        const result = await getCustomerByIdService(customerId);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        } else {
            res.status(200).json({
                success: true,
                data: result.rows[0],
            });
        }

    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to get customer by ID",
        });
    }
}

