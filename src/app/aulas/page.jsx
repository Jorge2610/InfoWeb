'use client'
import Link from 'next/link';
import { useState } from 'react';

const dayjs = require('dayjs');
let date = dayjs();
date = date.add(1, "d").format("YYYY-MM-DD");

const periodos = [];
let periodoInicial = dayjs().set('hour', 6).set('minute', 45).set('second', 0);
for (let i = 1; i < 11; i++) {
    let periodoPrevio = periodoInicial;
    periodoInicial = periodoInicial.add(90, 'minute');
    let periodo = { id: i + "", rango: periodoPrevio.format("HH:mm") + " - " + periodoInicial.format("HH:mm") };
    periodos.push(periodo);
}

const aulas = [];

for (let i = 1; i < 26; i++) {
    let aula = {
        id: i,
        aula: Math.floor(Math.random() * 69 + 625),
        capacidad: Math.floor(Math.random() * 40 + 80)
    };
    aulas.push(aula);
}

export default function Aulas() {

    const getData = () => {
        setPeriodo(document.getElementById("periodSelector").value);
    };

    const [periodo, setPeriodo] = useState("0");

    return (
        <div className='d-flex flex-column contenido mt-2'>
            <h2 className="text-primary">Aulas FCyT</h2>
            <div className="mt-3 row">
                <div className="col-12 col-sm-5 col-lg-5 mb-2">
                    <label htmlFor="dateSelector" className="form-label">Fecha</label>
                    <input type="date" id='dateSelector' className="form-control"
                        defaultValue={date} min={date} />
                </div>
                <div className={"col-7 col-sm-4 col-lg-5"}>
                    <label htmlFor="periodSelector" className="form-label">Periodo</label>
                    <select className="form-select" aria-label="periodSelector" id='periodSelector'>
                        <option value="0" key={0}>Todos</option>
                        {periodos.map(periodo => {
                            return (
                                <option value={periodo.id} key={periodo.id}>{periodo.rango}</option>
                            );
                        })}
                    </select>
                </div>
                <div className="col-5 col-sm-3 col-lg-2" style={{ marginTop: "30px" }}>
                    <div className="row w-100">
                        <button type="button" className="btn btn-primary" id='searchButton' onClick={getData}>
                            <i className="bi bi-search"></i> Buscar
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex-grow-1' style={{ overflowY: "auto" }}>
                <table className="table mt-3">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" className='text-center'>Aula</th>
                            <th scope="col" className='text-center'>Capacidad</th>
                            <th scope="col" className='text-center'>{periodo === "0" ? "Periodos" : "Reservar"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aulas.map((aula) => {
                            return (
                                <tr key={aula.id}>
                                    <th scope="row">{aula.id}</th>
                                    <td className='w-auto text-center'>{aula.aula}</td>
                                    <td className='w-auto text-center'>{aula.capacidad}</td>
                                    <td className='w-25 text-center'>
                                        {periodo === "0" ?
                                            <Link
                                                href={{ pathname: "/aulas/reservar", query: { aula: aula.id } }}
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
            <div className="col-2 mt-3 mb-2">
                <Link className="btn btn-primary" href="/">Atrás</Link>
            </div>
        </div>
    );
}