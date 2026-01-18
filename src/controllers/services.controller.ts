import { Request, Response } from "express";
import { addeditServiceService, deleteServiceService, getServiceByIdService, getServicesListingService } from "../services/services.service";

// Service Listing
export const serviceListing = async (req: Request, res: Response) => {
    try {
        const { pageSize = null, pageNo = null, search = null, sortBy = "adddate desc" }: any = req.body ?? {};
        const result = await getServicesListingService(pageSize, pageNo, search, sortBy);
        res.status(200).json({
            success: true,
            totalRecords: result.rowCount,
            data: result.rows,
        });
    }
    catch (error: any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch services",
        });
    }
}

// Service Add/Edit
export const serviceAddEdit = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.user_id; // from JWT_EXPIRES_IN
        const { serviceId = null, serviceName, isactive = true } = req.body;
        if (!serviceName) {
            return res.status(400).json({ success: false, message: "Service name is required" });
        }
        // Call the service to add/edit service
        const result = await addeditServiceService(userId, serviceId, serviceName, isactive);
        res.status(200).json({
            success: true,
            message: result,
        });
    }
    catch (error: any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to Add or Edit services",
        });
    }
};

// Service Deleted
export const serviceDelete = async (req: Request, res: Response) => {
    try {
        const { serviceId } = req.params;
        if (!serviceId) {
            return res.status(400).json({ success: false, message: "Service ID is required" });
        }
        const result = await deleteServiceService(Number(serviceId));
        res.status(200).json({
            success: true,
            message: result,
        });
    }
    catch (error: any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to delete service",
        });
    }
}

// Service Get By ID
export const serviceGetByID = async (req: Request, res: Response) => {
    try {
        const { serviceId } = req.params;
        if (!serviceId) {
            return res.status(400).json({ success: false, message: "Service ID is required" });
        }
        const result = await getServiceByIdService(Number(serviceId));
        if (result.rowCount === 0) {
            return res.status(404).json({ success: false, message: "Service not found" });
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
            message: error.message || "Failed to fetch service details",
        });
    }
}
