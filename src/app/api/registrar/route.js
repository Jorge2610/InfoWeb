import { query } from '@/utils/db';

export async function POST(req) {
    const data = await req.json()
    const consulta = `INSERT INTO public.aulas (nombre, capacidad, ubicacion, descripcion)
                      VALUES ($1, $2, $3, $4);`
    const valores = [data.nombre, data.capacidad, data.ubicacion, data.descripcion];
    try {
        let res = await query(consulta, valores);
        res = res.rows[0];
        return new Response(JSON.stringify({
            success: true,
            message: 'Registrado con éxito',
            data: res
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log("error en la consulta: ",error);
        return new Response(JSON.stringify({
            success: false,
            message: 'Error al registrar aula',
            error: error.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};