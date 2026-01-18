import { z } from "zod";

const customerAddEditInput = z.object({
    customerId: z.uuid().optional().nullable(),
    customerName: z.string("Customer name is required").min(1, "Customer name is required"),
    customerShortName: z.string().optional().nullable(),
    mobileNo: z.string().optional().nullable(),
    email: z.email("Invalid email format").optional().nullable(),
    address1: z.string().optional().nullable(),
    address2: z.string().optional().nullable(),
    city: z.string().optional().nullable(),
    zipCode: z.string().optional().nullable(),
    note: z.string().optional().nullable(),
    image: z.string().optional().nullable()
});

const customerGetByIdInput = z.object({
    customerId: z.uuid("Customer ID is required"),
});

const customerDeleteInput = z.object({
    customerId: z.uuid("Customer ID is required"),
});

export { customerAddEditInput, customerGetByIdInput, customerDeleteInput };