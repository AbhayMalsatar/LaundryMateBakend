import { z } from "zod";

const listingInput = z.object({
    page: z.number().min(1, "Page must be at least 1").optional(),
    pageSize: z.number().min(1, "Page size must be at least 1").optional(),
    search: z.string().optional().nullable(),
    sortBy: z.string().optional().nullable()
});

export { listingInput };
