import { commonAddEditService, commonDeleteService, commonGetByIdService, commonListingService } from "./common/common.service";

export const getClothTypeListingService = async (pageSize: number, pageNo: number, search: string, sortBy: string) => {
    try {
        const result = await commonListingService(pageSize, pageNo, search, sortBy, "clothtypes_listing");
        return result;

    } catch (error) {
        throw error;
    }
}

export const addEditClothTypeService = async (
    userId: number,
    clothTypeId: number | null,
    clothTypeName: string,
    isactive: boolean
) => {
    try {
        const result = await commonAddEditService([clothTypeId, clothTypeName, isactive, userId], "clothtypes_addedit");
        return result;
    } catch (error) {
        throw error;
    }
}

export const deleteClothTypeService = async (clothTypeId: number) => {
    try {
        const message = await commonDeleteService(clothTypeId, "clothtypes_delete");
        return message ? "Cloth type deleted successfully" : "Failed to delete cloth types";
    }
    catch (error) {
        throw error;
    }
}

export const getClothTypeByIdService = async (clothTypeId: number) => {
    try {
        // Call stored procedure with refcursor
        const result = await commonGetByIdService(clothTypeId, "clothtypes_getbyid");
        return result;
    }
    catch (error) {
        throw error;
    }
}