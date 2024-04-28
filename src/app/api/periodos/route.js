import { query } from "@/utils/db";

export async function GET(request) {
    const consulta = "SELECT * FROM periodos;";
    try {
        const response = await query(consulta);
        const periodos = response.rows;
        return Response.json({ periodos });
    } catch (error) {
        return new Response.json({ error });
    }
}