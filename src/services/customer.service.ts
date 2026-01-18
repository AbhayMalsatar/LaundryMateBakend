import { UUIDTypes } from "uuid";
import { commonAddEditService, commonDeleteService, commonGetByIdService, commonListingService } from "./common/common.service";

export const getCustomerListingService = async (pageSize: number, pageNo: number, search: string, sortBy: string) => {
    try {
        const result = await commonListingService(pageSize, pageNo, search, sortBy, "customers_listing");
        return result;
    } catch (error) {
        throw error;
    } 
}

export const addEditCustomerService = async (
    userId: UUIDTypes,
    customerId: UUIDTypes | null,
    customerName: string,
    customerShortName: string | null,
    mobileNo: string | null,
    email: string | null,
    address1: string | null,
    address2: string | null,
    city: string | null,
    zipCode: string | null,
    note: string | null,
    image: string | null
) => {
    try {
        const result = await commonAddEditService([ customerId, customerName, customerShortName, mobileNo, email, address1, address2, city, zipCode, note, image, userId, ""], "customers_addedit");
        return result;
    } catch (error) {
        throw error;
    }
}

export const deleteCustomerService = async (customerId: UUIDTypes) => {
    try {
        const result = await commonDeleteService(customerId, "customers_deletebyid");
        return result? "Customer deleted successfully" : "Failed to delete customer";
    } catch (error) {
        throw error;
    }
}

export const getCustomerByIdService = async (customerId: UUIDTypes) => {
    try {
        const result = await commonGetByIdService(customerId, "customers_getbyid");
        return result;
    } catch (error) {
        throw error;
    }
}