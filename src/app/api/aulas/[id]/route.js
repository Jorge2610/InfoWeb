import { query } from "@/utils/db";

export async function GET(request, { params }) {
    const id = parseInt(params.id);
    const consulta = "SELECT * FROM aulas" + (id === 0 ? `;` : ` WHERE idAula = ${id};`);
    try {
        const response = await query(consulta);
        const aulas = response.rows;
        return Response.json({ aulas });
    } catch (error) {
        return new Response.json({ error });
    }
}