import Navegador from "@/components/Navegador";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { fetchUsuarios } from "@/utils/data";

export default async function Usuarios() {
    cookies().get("tipo-usuario") === undefined ? redirect("/") : null;
    const usuarioc = cookies().get("nombre-usuario")?.value;
    const tipo = cookies().get("tipo-usuario")?.value;

    const usuarios = await fetchUsuarios(0)
    

    return (
        <div className="d-flex flex-column contenido mt-2">
            <Navegador usuario={usuarioc} tipo={tipo} />
            <h2 className="text-primary">Reservas FCyT</h2>
            <div className="flex-grow-1 mt-3" style={{ overflowY: "auto" }}>
                <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" className="text-center">
                                Nombre
                            </th>
                            <th scope="col" className="text-center">
                                Correo
                            </th>
                            <th scope="col" className="text-center">
                                Reservas
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {usuarios.map((usuario, index) => {
                            return (
                                <tr key={usuario.idusuario}>
                                    <th scope="row">{index+1}</th>
                                    <td className='w-auto text-center'>{usuario.nombreusuario}</td>
                                    <td className='w-auto text-center'>{usuario.dircorreo}</td>
                                    <td className='w-25 text-center'>
                                        <Link
                                                href={{ pathname: '/usuarios/reservas',query: { idusuario: usuario.idusuario} }}
                                                className='btn btn-outline-primary'>
                                                <i className="bi bi-eye"></i>
                                        </Link>
                                        
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
