'use client'
import { fetchReservasPorDocente, hacerReserva } from "@/utils/data";
import { fetchAulas } from '@/utils/data';
import { useEffect, useState } from "react";

import dayjs from 'dayjs';

export default function TablaReserva({reservas, aulas, periodos }) {
     const data = reservas;
     const dataAulas = aulas;
     const dataPeriodos = periodos;
    
     const obtenerAula = (idaula) => {
        const aula = dataAulas.find(aula => aula.idaula === idaula);
        return aula ? aula.nombre : 'aula no encontrada'
     }

     const obtenerPeriodoIncio = (idperiodo) => {
        const periodo = dataPeriodos.find(periodo => periodo.idperiodo === idperiodo);
        return periodo.periodo
     }
     
     const obtenerPeriodoFin = (idperiodo) => {
        const periodo = dataPeriodos.find(periodo => periodo.idperiodo === idperiodo);
        return periodo.periodo
     }
    

    return (
        <>
            
            <div className='flex-grow-1 mt-3' style={{ overflowY: "auto" }}>
                <table className="table">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" className='text-center'>Aula</th>
                            <th scope="col" className='text-center'>Fecha</th>
                            <th scope="col" className='text-center'>Inicio</th>
                            <th scope="col" className='text-center'>Fin</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((rango, index) => {
                            return (
                                <tr key={rango.idaula}>
                                    <th scope="row">{index +1}</th>
                                    <td className='text-center'>{obtenerAula(rango.idaula)}</td>
                                    <td className='text-center'>{dayjs(rango.fecha).format("DD/MM/YYYY")}</td>
                                    <td className='text-center'>{obtenerPeriodoIncio(rango.periodoinicio)}</td>
                                    <td className='text-center'>{obtenerPeriodoFin(rango.periodofin)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};