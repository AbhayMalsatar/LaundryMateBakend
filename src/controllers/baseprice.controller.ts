import { NextFunction, Request, Response } from "express";

import { addEditBasePriceService, deleteBasePriceService, getBasePriceByIdService, getBasePriceListingService } from "../services/baseprice.service";
import { listingInput } from "../DTO/common.dto";
import { basePriceAddEditInput, basePriceDeleteInput } from "../DTO/basePrice.dto";
import ApiResponse from "../utils/ApiResponse";

// Base Price Listing
export const basePriceListing = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { pageSize = null, pageNo = null, search = null, sortBy = "adddate desc" }: any = listingInput.parse(req.body ?? {});
        const result = await getBasePriceListingService(pageSize, pageNo, search, sortBy);
        ApiResponse.success(res, {
            totalRecords: result.rowCount || 0,
            data: result.rows,
        });
    } catch (error: any) {
       next(error);
    }
}

// Base Price Add/Edit
export const basePriceAddEdit = async (req: Request, res: Response, next:NextFunction) => {
    
    try {
        const userId = (req as any).userId; // from JWT_EXPIRES_IN
        const { basePriceId = null, clothTypeId, serviceId, basePrice, isactive = true } = basePriceAddEditInput.parse(req.body);

        // Call the service to add/edit base price
        const result = await addEditBasePriceService(
            userId,
            basePriceId,
            clothTypeId,
            serviceId,
            basePrice,
            isactive
        );
        ApiResponse.success(res, {
            message: result,
        });
        
    }
    catch (error: any) {
        next(error);
    }
}

// Base Price Delete
export const basePriceDelete = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { basePriceId } = basePriceDeleteInput.parse(req.body);
        const result = await deleteBasePriceService(basePriceId);
        ApiResponse.success(res, {
            message: result,
        });
    }
    catch (error: any) {
        next(error);
    }
}

// Get Base Price by ID
export const getBasePriceById = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { basePriceId } = basePriceDeleteInput.parse(req.body);
        const result = await getBasePriceByIdService(basePriceId);
        if (!result || result.rowCount === 0) {
            ApiResponse.error(res, {
                message: "Base price not found",
                statusCode: 404,
            });
        } else {
            ApiResponse.success(res, {
                data: result.rows[0],
            });
        }
           
    }
    catch (error: any) {
        next(error);
    }
}
