import { query } from '@/utils/db';

export async function GET(req) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const idusuario = searchParams.get('idusuario');

    if (!idusuario) {
        return new Response(JSON.stringify({
            error: 'idusuario parameter is required'
        }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    const consulta = `SELECT * FROM  public.reservas 
                      WHERE idusuario = ${idusuario} `;
    try {
        let res = await query(consulta);
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