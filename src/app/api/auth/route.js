import { query } from "@/utils/db";


export async function POST(request) {
    try {
        const data = await request.json();
        const {nombreusuario,contrasenia} = data;
        

        const consulta = "SELECT * FROM usuarios WHERE nombreusuario = $1 AND contrasenia = $2;";
        const valores = [nombreusuario,contrasenia];

        const response = await query(consulta,valores);

        if(response.rows.length > 0) {
            const usuario = response.rows[0];
            
            return new Response( JSON.stringify ({
                success:true,
                message: "usuario autenticado con exito",
                user:usuario
            }), {
                status:200,
                headers: {
                    'Content-type': 'application/json'
                }
            });
        } else {
            return new Response(JSON.stringify({
                success:false,
                message:"Nombre usuario o contraseña incorrecta"
            }), {
                status:401,
                headers: {
                    'Content-type':'application/json'
                }
            });

        }
        
        
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({
            success:false,
            message:"Error al autenticar el usuario",
            error: error.message
        }),{
            status:500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}