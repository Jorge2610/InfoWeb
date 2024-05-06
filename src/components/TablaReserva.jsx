'use client'
import { hacerReserva } from "@/utils/data";
import { fetchReservasPorAula } from '@/utils/data';
import { useEffect, useState } from "react";

export default function TablaReserva({ idAula, fecha }) {

    const [data, setData] = useState([]);

    const getData = async () => {
        const reservas = await fetchReservasPorAula(idAula, fecha);
        setData(reservas);
    };

    useEffect(() => {
        getData()
    }, []);

    const reservar = async (idPeriodoInicio) => {
        const idPeriodoFin = idPeriodoInicio + 1;
        const res = await hacerReserva(idAula, fecha, idPeriodoInicio, idPeriodoFin, 1);
        if (res === 200) {
            getData();
        }
    };

    return (
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
                    {data.map((rango) => {
                        return (
                            <tr key={rango.idperiodo}>
                                <th scope="row">{rango.idperiodo}</th>
                                <td className='text-center'>{rango.periodo}</td>
                                <td className='text-center'>{rango.fin}</td>
                                <td className='text-center'>
                                    <button
                                        className='btn btn-outline-primary'
                                        disabled={rango.reservado}
                                        onClick={e => reservar(rango.idperiodo)}
                                        title="Reservar periodo">
                                        Reservar
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};