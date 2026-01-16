import { pool } from "../../config/connection";

export const commonListingService = async (pageSize: number, pageNo: number, search: string, sortBy: string, spName: string) => {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        await client.query(
            `CALL ${spName}($1, $2, $3, $4, $5)`,
            [
                pageSize ? pageSize : null,
                pageNo ? pageNo : null,
                search,
                sortBy,
                "listing_cursor",
            ]
        );

        const result = await client.query(
            "FETCH ALL FROM listing_cursor"
        );
        await client.query("COMMIT");
        return result;

    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    }
    finally {
        client.release();
    }
}

export const commonGetByIdService = async (id: number, spName: string) => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            `CALL ${spName}($1)`,
            [id]
        );
        return result;
    }
    catch (error) {
        throw error;
    }
    finally {
        client.release();
    }
}

export const commonDeleteService = async (id: number, spName: string) => {
    const client = await pool.connect();
    try {
        await client.query(
            `CALL ${spName}($1)`,
            [id]
        );
        return "Deleted successfully";
    }
    catch (error) {
        throw error;
    }
    finally {
        client.release();
    }
}

export const commonAddEditService = async (params: any[], spName: string) => {
    const client = await pool.connect();
    try {
        const placeholders = params.map((_, index) => `$${index + 1}`).join(", ");
        const result = await client.query(
            `CALL ${spName}(${placeholders})`,
            params
        );
        const message = result?.rows?.[0]?.p_message || "Success";
        return message;
    }
    catch (error) {
        throw error;
    }
    finally {
        client.release();
    }
}