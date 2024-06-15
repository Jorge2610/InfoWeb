import Buscador from '@/components/Buscador';
import Navegador from '@/components/Navegador';
import dayjs from 'dayjs';
import { fetchAulas, fetchPeriodos } from '@/utils/data';
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Aulas({ searchParams }) {

    cookies().get("tipo-usuario") === undefined ? redirect("/") : null;
    const usuario = cookies().get("nombre-usuario")?.value;
    const tipo = cookies().get("tipo-usuario")?.value;
    const periodoInicio = searchParams.periodoIni;
    const periodoFin = searchParams.periodoFin;
    const actual = dayjs().add(1, "d");
    const fechaParam = dayjs(searchParams.fecha);
    const fecha = actual > fechaParam ? actual.format("YYYY-MM-DD") : fechaParam.format("YYYY-MM-DD");

    const aulas = await fetchAulas(0);
    const periodos = await fetchPeriodos();

    return (
        <div className='d-flex flex-column contenido mt-2'>
            <Navegador usuario={usuario} tipo={tipo} />
            <h2 className="text-primary">Aulas FCyT</h2>
            <Buscador periodos={periodos} fecha={fecha} periodoIni={periodoInicio} />
            <div className='flex-grow-1 mt-3' style={{ overflowY: "auto" }}>
                <table className="table">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" className='text-center'>Aula</th>
                            <th scope="col" className='text-center'>Capacidad</th>
                            <th scope="col" className='text-center'>{periodoInicio === "0" ? "Periodos" : "Reservar"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aulas.map((aula) => {
                            return (
                                <tr key={aula.idaula}>
                                    <th scope="row">{aula.idaula}</th>
                                    <td className='w-auto text-center'>{aula.nombre}</td>
                                    <td className='w-auto text-center'>{aula.capacidad}</td>
                                    <td className='w-25 text-center'>
                                        {periodoInicio === "0" ?
                                            <Link
                                                href={{ pathname: '/aulas/reservar', query: { aula: aula.idaula, fecha: fecha } }}
                                                className='btn btn-outline-primary'>
                                                <i className="bi bi-eye"></i>
                                            </Link>
                                            :
                                            <button className='btn btn-outline-primary'>Reservar</button>
                                        }
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