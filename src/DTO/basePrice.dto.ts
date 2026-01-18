import { z } from "zod";

const basePriceAddEditInput = z.object({
    basePriceId: z.uuid().optional().nullable(),
    clothTypeId: z.uuid("Cloth Type ID is required"),
    serviceId: z.uuid("Service ID is required"),
    basePrice: z.number("Price is required").min(0, "Price must be at least 0"),
    isactive: z.boolean().optional().default(true)
});

const basePriceGetByIdInput = z.object({
    basePriceId: z.uuid("Base Price ID is required"),
});

const basePriceDeleteInput = z.object({
    basePriceId: z.uuid("Base Price ID is required"),
});

export { basePriceAddEditInput, basePriceGetByIdInput, basePriceDeleteInput };