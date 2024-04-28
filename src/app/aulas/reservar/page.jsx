import Link from 'next/link';
import { fetchAulas, fetchPeriodos } from '@/utils/data';
import dayjs from 'dayjs';

export default async function ReservaAula({ searchParams }) {

    const idAula = searchParams.aula;
    const fecha = searchParams.fecha;

    const aula = (await fetchAulas(idAula))[0];
    let periodos = await fetchPeriodos();
    const rangos = [];
    for (let i = 0; i < periodos.length - 1; i++) {
        rangos.push({ ...periodos[i], fin: periodos[i + 1].periodo });
    }

    return (
        <div className="d-flex flex-column contenido mt-2">
            <h2 className="text-primary">Reserva de periodo - {aula.nombre}</h2>
            <div className="row">
                <div className="col-12 col-md-6">
                    <h4 className='text-primary'>Fecha: {dayjs(fecha).format("DD/MM/YYYY")}</h4>
                </div>
                <div className="col-12 col-md-6">
                    <h4 className='text-primary'>Capacidad: {aula.capacidad} estudiantes</h4>
                </div>
            </div>
            <div className='border rounded border-primary'>
                <h5 className='text-primary pt-1 ps-1'>Descripción:</h5>
                <p className='ps-2'>{aula.ubicacion}</p>
                <p className='ps-2'>{aula.descripcion}</p>
            </div>
            <div className='flex-grow-1 mt-3' style={{ overflowY: "auto" }}>
                <table className="table">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" className='text-center'>Inicio</th>
                            <th scope="col" className='text-center'>Fin</th>
                            <th scope="col" className='text-center'>Reserva</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rangos.map((rango) => {
                            return (
                                <tr key={rango.idperiodo}>
                                    <th scope="row">{rango.idperiodo}</th>
                                    <td className='text-center'>{rango.periodo}</td>
                                    <td className='text-center'>{rango.fin}</td>
                                    <td className='text-center'>
                                        {rango.reservado ?
                                            "Reservado"
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
            <div className="col-2 mt-3 mb-2">
                <Link
                    href={{ pathname: "/aulas", query: { fecha: fecha, periodo: 0 } }}
                    className='btn btn-primary'>
                    Atrás
                </Link>
            </div>
        </div>
    );
};