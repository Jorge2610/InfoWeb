import { query } from '@/utils/db';
import { revalidateTag } from "next/cache";

export async function POST(req, res) {
    const data = await req.json()

    const consulta = `INSERT INTO public.reservas (idaula, fecha, periodoinicio, periodofin, idusuario)
                      VALUES ($1, $2, $3, $4, $5);`;
    const valores = [data.idAula, data.fecha, data.idPeriodoInicio, data.idPeriodoFin, data.idUsuario];
    try {
        await realizarTransaccion(consulta, valores); // Ejecuta la transacción
        revalidateTag('reservasAula');
        return new Response(JSON.stringify({
            success: true,
            message: 'Reservado con éxito',
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error al reservar:', error);
        return new Response(JSON.stringify({
            success: true,
            message: 'Error al reservar',
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};

async function realizarTransaccion(consulta, valores) {
    try {
        await query('BEGIN');
        await query(consulta, valores);
        await query('COMMIT');
        console.log('Transaccion exitosa');
    } catch (error) {
        await query('ROLLBACK');
        console.error('Error en la transaccion:', error);
    }
}