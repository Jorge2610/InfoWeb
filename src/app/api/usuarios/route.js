import { query } from "@/utils/db";

export async function GET(request) {
    
    const consulta = "SELECT idusuario, nombreusuario, dircorreo FROM usuarios WHERE tipousuario = 'docente';";
    try {
        const response = await query(consulta);
        const docentes = response.rows;
        return Response.json({ docentes });
    } catch (error) {
        return new Response.json({ error });
    }
}