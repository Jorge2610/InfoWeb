"use client"
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const dayjs = require('dayjs');
let date = dayjs();
date = date.add(1, "d").format("YYYY-MM-DD");

const periodos = [];
let periodoInicial = dayjs().set('hour', 6).set('minute', 45).set('second', 0);
for (let i = 1; i < 11; i++) {
    let periodoPrevio = periodoInicial;
    periodoInicial = periodoInicial.add(90, 'minute');
    let periodo = { id: i + "", rango: periodoPrevio.format("HH:mm") + " - " + periodoInicial.format("HH:mm"), reservado: (i % 2 == 0) };
    periodos.push(periodo);
}

export default function Aula() {

    const searchParams = useSearchParams();
    const idAula = searchParams.get('aula');

    return (
        <div className="d-flex flex-column contenido mt-2">
            <h2 className="text-primary">Reserva de periodo</h2>
            <div className="row">
                <div className="col-12 col-md-6">
                    <h4 className='text-primary'>Aula: 691D</h4>
                </div>
                <div className="col-12 col-md-6">
                    <h4 className='text-primary'>Capacidad: 90 estudiantes</h4>
                </div>
            </div>
            <div className='border rounded border-primary'>
                <h5 className='text-primary pt-1 ps-1'>Descripción:</h5>
                <p className='ps-1'>El aula 691D cuenta con dos pizarras acricilicas y un datadisplay marca EPSON, se encuentra ubicada en el edificio nuevo y tiene una capacidad de 90 estudiantes.</p>
            </div>
            <div className='flex-grow-1 mt-3' style={{ overflowY: "auto" }}>
                <table className="table">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" className='text-center'>Periodo</th>
                            <th scope="col" className='text-center'>Reserva</th>
                        </tr>
                    </thead>
                    <tbody>
                        {periodos.map((periodo) => {
                            return (
                                <tr key={periodo.id}>
                                    <th scope="row">{periodo.id}</th>
                                    <td className='text-center'>{periodo.rango}</td>
                                    <td className='text-center'>
                                        {periodo.reservado ?
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
                <Link className="btn btn-primary" href="/aulas">Atrás</Link>
            </div>
        </div>
    );
};