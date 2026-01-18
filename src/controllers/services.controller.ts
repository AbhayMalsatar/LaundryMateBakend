import { NextFunction, Request, Response } from "express";
import { addeditServiceService, deleteServiceService, getServiceByIdService, getServicesListingService } from "../services/services.service";
import { serviceAddEditInput, serviceDeleteInput, serviceGetByIdInput } from "../DTO/services.dto";
import { listingInput } from "../DTO/common.dto";
import ApiResponse from "../utils/ApiResponse";

// Service Listing
export const serviceListing = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { pageSize = null, pageNo = null, search = null, sortBy = "adddate desc" }: any = listingInput.parse(req.body ?? {});
        const result = await getServicesListingService(pageSize, pageNo, search, sortBy);
        ApiResponse.success(res, {
            totalRecords: result.rowCount || 0,
            data: result.rows,
        });
    }
    catch (error: any) {
        next(error);
    }
}

// Service Add/Edit
export const serviceAddEdit = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const userId = (req as any).userId; // from JWT_EXPIRES_IN
        const { serviceId = null, serviceName, isactive = true } = serviceAddEditInput.parse(req.body);

        // Call the service to add/edit service
        const result = await addeditServiceService(userId, serviceId, serviceName, isactive);
        ApiResponse.success(res, {
            message: result,
        });
    }
    catch (error: any) {
       next(error);
    }
};

// Service Deleted
export const serviceDelete = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { serviceId } = serviceDeleteInput.parse(req.body);
        const result = await deleteServiceService(serviceId);
        ApiResponse.success(res, {
            message: result,
        });
    }
    catch (error: any) {
        next(error);
    }
}

// Service Get By ID
export const serviceGetByID = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { serviceId } = serviceGetByIdInput.parse(req.body);
        const result = await getServiceByIdService(serviceId);
        if (result.rowCount === 0) {
            ApiResponse.error(res, {
                message: "Service not found",
                statusCode: 404,
            });
            return;
        }
        ApiResponse.success(res, {
            data: result.rows[0],
        });
    }
    catch (error: any) {
        next(error);
    }
}
