import { Request, Response } from "express";

import { addEditBasePriceService, deleteBasePriceService, getBasePriceByIdService, getBasePriceListingService } from "../services/baseprice.service";

// Base Price Listing
export const basePriceListing = async (req: Request, res: Response) => {
    try {
        const { pageSize = null, pageNo = null, search = null, sortBy = "adddate desc" }: any = req.body ?? {};
        const result = await getBasePriceListingService(pageSize, pageNo, search, sortBy);
        res.status(200).json({
            success: true,
            totalRecords: result.rowCount,
            data: result.rows,
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch base prices",
        });
    }
}

// Base Price Add/Edit
export const basePriceAddEdit = async (req: Request, res: Response) => {
    
    try {
        const userId = (req as any).user.user_id; // from JWT_EXPIRES_IN
        const { basePriceId = null, clothTypeId, serviceId, basePrice, isactive = true } = req.body;
        if (!clothTypeId || !serviceId || basePrice === undefined) {
            return res.status(400).json({ success: false, message: "Cloth type ID, Service ID and Price are required" });
        }
        // Call the service to add/edit base price
        const result = await addEditBasePriceService(
            userId,
            basePriceId,
            clothTypeId,
            serviceId,
            basePrice,
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
            message: error.message || "Failed to Add or Edit base prices",
        });
    }
}

// Base Price Delete
export const basePriceDelete = async (req: Request, res: Response) => {
    try {
        const { basePriceId } = req.params;
        if (!basePriceId) {
            return res.status(400).json({ success: false, message: "Base price ID is required" });
        }
        const result = await deleteBasePriceService(Number(basePriceId));
        res.status(200).json({
            success: true,
            message: result,
        });
    }
    catch (error: any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to delete base price",
        });
    }
}

// Get Base Price by ID
export const getBasePriceById = async (req: Request, res: Response) => {
    try {
        const { basePriceId } = req.params;
        if (!basePriceId) {
            return res.status(400).json({ success: false, message: "Base price ID is required" });
        }
        const result = await getBasePriceByIdService(Number(basePriceId));
        if (!result || result.rowCount === 0) {
            return res.status(404).json({ success: false, message: "Base price not found" });
        }
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error: any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch base price",
        });
    }
}
