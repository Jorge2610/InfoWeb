import { query } from '@/utils/db';

export async function POST(req, res) {
    const data = await req.json()
    const consulta = `INSERT INTO public.reservas (idaula, fecha, periodoinicio, periodofin, idusuario)
                      VALUES ($1, $2, $3, $4, $5);`;
    const valores = [data.idAula, data.fecha, data.idPeriodoInicio, data.idPeriodoFin, data.idUsuario];
    try {
        let res = await query(consulta, valores);
        res = res.rows[0];
        return new Response(JSON.stringify({
            success: true,
            message: 'Reservado con éxito',
            data: res
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            message: 'Error al reservar',
            error: error.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};