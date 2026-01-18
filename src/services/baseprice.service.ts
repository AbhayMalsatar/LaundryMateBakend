import { commonAddEditService, commonDeleteService, commonGetByIdService, commonListingService } from "./common/common.service";

export const getBasePriceListingService = async (pageSize: number, pageNo: number, search: string, sortBy: string) => {
    try {
        const result = await commonListingService(pageSize, pageNo, search, sortBy, "baseprice_listing");
        return result;
        
    } catch (error) {
        throw error;
    }
}

export const addEditBasePriceService = async (
    userId: number,
    basePriceId: number | null,
    clothTypeId: number,
    serviceId: number,
    basePrice: number,
    isactive: boolean
) => {
    try {
        const result = await commonAddEditService([basePriceId, clothTypeId, serviceId, basePrice, isactive, userId], "baseprice_addedit");
        return result;
    }
    catch (error) {
        throw error;
    }
}

export const deleteBasePriceService = async (basePriceId: number) => {
    try {
        const message = await commonDeleteService(basePriceId, "baseprice_delete");
        return message ? "Base price deleted successfully" : "Failed to delete base price";
    }
    catch (error) {
        throw error;
    }
}

export const getBasePriceByIdService = async (basePriceId: number) => {
    try {
        // Call stored procedure with refcursor
        const result = await commonGetByIdService(basePriceId, "baseprice_getbyid");
        return result;
    }
    catch (error) {
        throw error;
    }
}
