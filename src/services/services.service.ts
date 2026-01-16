import { commonAddEditService, commonDeleteService, commonGetByIdService, commonListingService } from "./common/common.service";

export const getServicesListingService = async (pageSize: number, pageNo: number, search: string, sortBy: string) => {
    try {
        const result = await commonListingService(pageSize, pageNo, search, sortBy, "services_listing");
        return result;

    } catch (error) {
        throw error;
    }
}

export const addeditServiceService = async (
    userId: number,
    serviceId: number | null,
    serviceName: string,
    isactive: boolean | false,
) => {
    try {
        const result = await commonAddEditService([serviceId, serviceName, isactive, userId], "services_addedit");
        return result;
    }
    catch (error) {
        throw error;
    }
}

export const deleteServiceService = async (serviceId: number) => {
    try {
        const message = await commonDeleteService(serviceId, "services_delete");
        return message ? "Service deleted successfully" : "Failed to delete service";
    }
    catch (error) {
        throw error;
    }
}

export const getServiceByIdService = async (serviceId: number) => {
    try {
        // Call stored procedure with refcursor
        const result = await commonGetByIdService(serviceId, "services_getbyid");
        return result;
    }
    catch (error) {
        throw error;
    }
}