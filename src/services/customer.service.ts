import { pool } from "../config/connection";

export const getCustomerListingService = async (pageSize: number, pageNo: number, search: string, sortBy: string) => {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        await client.query(
            `CALL customers_listing($1, $2, $3, $4, $5)`,
            [
                pageSize ? pageSize : null,
                pageNo ? pageNo : null,
                search,
                sortBy,
                "customer_cursor",
            ]
        );

        const result = await client.query(
            "FETCH ALL FROM customer_cursor"
        );

        await client.query("COMMIT");

        return result;

    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
}

export const addEditCustomerService = async (
    userId: number,
    customerId: number | null,
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
    const client = await pool.connect();
    try {
        const result = await client.query(
            `CALL customers_addedit($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
            [customerId, customerName, customerShortName, mobileNo, email, address1, address2, city, zipCode, note, image, userId, null]
        );
        const message = result?.rows?.[0]?.p_message || "Success";
        return message;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

export const deleteCustomerService = async (customerId: number) => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            `CALL customers_deletebyid($1, $2)`,
            [customerId, null]
        );
        const message = result?.rows?.[0]?.p_message || "Customer deleted successfully";
        return message;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

export const getCustomerByIdService = async (customerId: number) => {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        // Call stored procedure with refcursor
        const cursorName = "customer_cursor";
        await client.query(`CALL customers_get_by_id($1, $2)`, [customerId, cursorName]);

        // Fetch cursor data
        const result = await client.query(`FETCH ALL FROM ${cursorName}`);

        await client.query("COMMIT");

        return result;
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
}