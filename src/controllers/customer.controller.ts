import { NextFunction, Request, Response } from "express";
import { addEditCustomerService, deleteCustomerService, getCustomerByIdService, getCustomerListingService } from "../services/customer.service";
import { customerAddEditInput, customerDeleteInput, customerGetByIdInput } from "../DTO/customers.dto";
import { listingInput } from "../DTO/common.dto";
import ApiResponse from "../utils/ApiResponse";

// Customer Listing
export const customerListing = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { pageSize = null, pageNo = null, search = null, sortBy = "adddate desc" }: any = listingInput.parse(req.body ?? {});
        const result = await getCustomerListingService(pageSize, pageNo, search, sortBy);
        ApiResponse.success(res, {
            totalRecords: result.rowCount || 0,
            data: result.rows,
        });
    } catch (error: any) {
        next(error);
    }
};

// Customer Add/Edit
export const customerAddEdit = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const userId = (req as any).userId || null; // from JWT
        const { customerId = null, customerName, customerShortName = null, mobileNo = null, email = null, address1 = null, address2 = null, city = null, zipCode = null, note = null, image = null } = customerAddEditInput.parse(req.body);
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
        ApiResponse.success(res, {
            message: result,
        });
    } catch (error: any) {
        next(error);
    }
};

// Customer Delete
export const customerDelete = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { customerId } = customerDeleteInput.parse(req.body);
        const result = await deleteCustomerService(customerId);

        ApiResponse.success(res, {
            message: result,
        });
    } catch (error: any) {
       next(error);
    }
};

export const customerGetById = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const { customerId } = customerGetByIdInput.parse(req.body);
        const result = await getCustomerByIdService(customerId);
        if (result.rows.length === 0) {
            ApiResponse.error(res, {
                message: "Customer not found",
                statusCode: 404,
            });
        } else {
            ApiResponse.success(res, {
                data: result.rows[0],
            });
        }

    } catch (error: any) {
        next(error);
    }
}

