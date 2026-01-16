import { pool } from "../config/connection";

export const getClothTypeListingService = async (pageSize: number, pageNo: number, search: string, sortBy: string) => {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        await client.query(
            `CALL clothtypes_listing($1, $2, $3, $4, $5)`,
            [
                pageSize ? pageSize : null,
                pageNo ? pageNo : null,
                search,
                sortBy,
                "clothtype_cursor",
            ]
        );

        const result = await client.query(
            "FETCH ALL FROM clothtype_cursor"
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

export const addEditClothTypeService = async (
    userId: number,
    clothTypeId: number | null,
    clothTypeName: string,
    isactive: boolean
) => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            `CALL clothtypes_addedit($1, $2, $3, $4, $5)`,
            [clothTypeId, clothTypeName, isactive, userId, null]
        );
        const message = result?.rows?.[0]?.p_message || "Success";
        return message;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

export const deleteClothTypeService = async (clothTypeId: number) => {
    const client = await pool.connect();
    try {
        await client.query(
            `CALL clothtypes_delete($1)`,
            [clothTypeId]
        );
        return "Cloth type deleted successfully";
    }
    catch (error) {
        throw error;
    }
    finally {
        client.release();
    }
}

export const getClothTypeByIdService = async (clothTypeId: number) => {
    const client = await pool.connect();
    try {
         await client.query("BEGIN");

        // Call stored procedure with refcursor
        const cursorName = "clothtype_cursor";
        await client.query(`CALL clothtypes_getbyid($1, $2)`, [clothTypeId, cursorName]);
        const result = await client.query(`FETCH ALL FROM ${cursorName}`);
        
        await client.query("COMMIT");
        return result;
    }
    catch (error) {
        await client.query("ROLLBACK");
        throw error;
    }
    finally {
        client.release();
    }
}