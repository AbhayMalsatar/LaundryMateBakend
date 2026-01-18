import { z } from "zod";

const serviceAddEditInput = z.object({
    serviceId: z.uuid().optional().nullable(),
    serviceName: z.string("Service name is required").min(1, "Service name is required"),
    isactive: z.boolean().optional().default(true)
});

const serviceGetByIdInput = z.object({
    serviceId: z.uuid("Service ID is required"),
});

const serviceDeleteInput = z.object({
    serviceId: z.uuid("Service ID is required"),
});
export { serviceAddEditInput, serviceGetByIdInput, serviceDeleteInput };