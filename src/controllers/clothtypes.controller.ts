const pool = require("../db");
import { Request, Response } from "express";
import { addEditClothTypeService, deleteClothTypeService, getClothTypeByIdService, getClothTypeListingService } from "../services/closetypes.service";

// Cloth Type Listing
export const clothTypeListing = async (req: Request, res: Response) => {
    try {
        const { pageSize = null, pageNo = null, search = null, sortBy = "adddate desc" }: any = req.body ?? {};
        const result = await getClothTypeListingService(pageSize, pageNo, search, sortBy);
        res.status(200).json({
            success: true,
            totalRecords: result.rowCount,
            data: result.rows,
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch cloth types",
        });
    }
}

// Cloth Type Add/Edit
export const clothTypeAddEdit = async (req: Request, res: Response) => {

    try {
        const userId = (req as any).user.user_id; // from JWT_EXPIRES_IN
        const { clothTypeId = null, clothTypeName, isactive = true } = req.body;
        
        if (!clothTypeName) {
            return res.status(400).json({ success: false, message: "Cloth type name is required" });
        }
        // Call the service to add/edit cloth type
        const result = await addEditClothTypeService(
            userId,
            clothTypeId,
            clothTypeName,
            isactive
        );
        res.status(200).json({
            success: true,
            message: result,
        });

    }
    catch (error: any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to Add or Edit cloth types",
        });
    }
};

// Cloth Type Delete
export const clothTypeDelete = async (req: Request, res: Response) => {
    try {
        const { clothTypeId } = req.params;
        if (!clothTypeId) {
            return res.status(400).json({ success: false, message: "Cloth type ID is required" });
        }
        // Here you would call a service to delete the cloth type
        const message = await deleteClothTypeService(Number(clothTypeId));
        res.status(200).json({
            success: true,
            message: message,
        });
    }
    catch (error: any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to delete cloth type",
        });
    }
}

// Cloth Type Get By ID
export const clothTypeGetByID = async (req: Request, res: Response) => {
    try {
        const { clothTypeId } = req.params;
        if (!clothTypeId) {
            return res.status(400).json({ success: false, message: "Cloth type ID is required" });
        }
        const result = await getClothTypeByIdService(Number(clothTypeId));
        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: "Cloth type not found" });
        }
        res.status(200).json({
            success: true,
            data: result.rows[0],
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch cloth type",
        });
    }
}