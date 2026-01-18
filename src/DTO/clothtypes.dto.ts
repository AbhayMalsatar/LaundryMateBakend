import { z } from "zod";

const clothTypeAddEditInput = z.object({
    clothTypeId: z.uuid().optional().nullable(),
    clothTypeName: z.string("Cloth type name is required").min(1, "Cloth type name is required"),
    isactive: z.boolean().optional().default(true)
});

const clothTypeGetByIdInput = z.object({
    clothTypeId: z.uuid("Cloth Type ID is required"),
});

const clothTypeDeleteInput = z.object({
    clothTypeId: z.uuid("Cloth Type ID is required"),
});

export { clothTypeAddEditInput, clothTypeGetByIdInput, clothTypeDeleteInput };