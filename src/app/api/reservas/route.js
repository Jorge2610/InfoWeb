import { query } from '@/utils/db';

export async function GET(req) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const idAula = searchParams.get('idAula');
    const fecha = searchParams.get('fecha');
    const consulta = `SELECT * FROM  public.reservas 
                      WHERE idaula = $1 AND fecha = $2 AND (periodofin - periodoinicio) = 1;`;
    const valores = [idAula, fecha];
    try {
        let res = await query(consulta, valores);
        res = res.rows;
        return new Response(JSON.stringify({
            data: res
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({
            error: error.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};