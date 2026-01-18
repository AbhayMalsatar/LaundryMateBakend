import { NextFunction, Request, Response } from "express";
import { addEditClothTypeService, deleteClothTypeService, getClothTypeByIdService, getClothTypeListingService } from "../services/closetypes.service";
import { listingInput } from "../DTO/common.dto";
import { clothTypeAddEditInput, clothTypeDeleteInput, clothTypeGetByIdInput } from "../DTO/clothtypes.dto";
import ApiResponse from "../utils/ApiResponse";

// Cloth Type Listing
export const clothTypeListing = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { pageSize = null, pageNo = null, search = null, sortBy = "adddate desc" }: any = listingInput.parse(req.body ?? {});
        const result = await getClothTypeListingService(pageSize, pageNo, search, sortBy);
        ApiResponse.success(res, {
            totalRecords: result.rowCount || 0,
            data: result.rows,
        });
    } catch (error: any) {
       next(error);
    }
}

// Cloth Type Add/Edit
export const clothTypeAddEdit = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const userId = (req as any).userId; // from JWT_EXPIRES_IN
        const { clothTypeId = null, clothTypeName, isactive = true } = clothTypeAddEditInput.parse(req.body)
    
        // Call the service to add/edit cloth type
        const result = await addEditClothTypeService(
            userId,
            clothTypeId,
            clothTypeName,
            isactive
        );
        ApiResponse.success(res, {
            message: result,
        });

    }
    catch (error: any) {
       next(error);
    }
};

// Cloth Type Delete
export const clothTypeDelete = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { clothTypeId } = clothTypeDeleteInput.parse(req.body);
        // Here you would call a service to delete the cloth type
        const message = await deleteClothTypeService(clothTypeId);
        ApiResponse.success(res, {
            message: message,
        });
    }
    catch (error: any) {
       next(error);
    }
}

// Cloth Type Get By ID
export const clothTypeGetByID = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { clothTypeId } = clothTypeGetByIdInput.parse(req.body);
        const result = await getClothTypeByIdService(clothTypeId);
        if (result.rowCount === 0) {
            ApiResponse.error(res, {
                message: "Cloth type not found",
                statusCode: 404,
            });
            return;
        }
        ApiResponse.success(res, {
            data: result.rows[0],
        });
    } catch (error: any) {
        next(error);
    }
}