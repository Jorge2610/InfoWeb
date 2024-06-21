import { query } from "@/utils/db";

export async function GET(request, {params}) {
    const id = parseInt(params.id)
    const consulta = `
        SELECT * FROM usuarios 
        ${id === 0 ? "WHERE tipousuario = 'docente'" : `WHERE idusuario = ${id} AND tipousuario = 'docente'`}
    `;
    try {
        const response = await query(consulta);
        const docentes = response.rows;
        return Response.json({ docentes });
    } catch (error) {
        return new Response.json({ error });
    }
}