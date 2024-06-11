import { cookies } from "next/headers";

export async function GET(request) {
    cookies().delete("tipo-usuario");
    cookies().delete("nombre-usuario");
    return Response.json({ logout: true });
}