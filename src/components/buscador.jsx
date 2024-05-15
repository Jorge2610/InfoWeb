'use client'
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

export default function Buscador({ periodos, fecha, periodoIni}) {

    const inputFecha = useRef(null);
    const [periodoInicio, setPeriodoInicio] = useState(periodoIni);
    const periodoFin = useRef(null);
    const router = useRouter();
    const fechaActual = dayjs().add(1, "d").format("YYYY-MM-DD");
    const periodosFin = [];
    for (let i = parseInt(periodoInicio); i < periodos.length; i++) {
        periodosFin.push(periodos[i]);
    };

    const handleSearch = () => {
        const ruta = `/aulas?fecha=${inputFecha.current.value}&periodoIni=${periodoInicio}&periodoFin=${periodoFin.current.value}`
        router.push(ruta);
    };

    const handleSelect = (value) => {
        setPeriodoInicio(value);
    };

    return (
        <div className="mt-3 row">
            <div className="col-12 col-sm-6 col-lg-6">
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="inicioPeriodo" className="form-label">Inicio Periodo</label>
                        <select id="inicioPeriodo"
                            className="form-select"
                            aria-label="inicioPeriodo"
                            defaultValue={periodoIni}
                            onChange={e => handleSelect(e.target.value)}>
                            <option value="0" key={0}>Todos</option>
                            {periodos.map(periodo => {
                                return (
                                    <option value={periodo.idperiodo} key={periodo.idperiodo}>
                                        {periodo.periodo}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="col-6">
                        <label htmlFor="finPeriodo" className="form-label">Fin Periodo</label>
                        <select id="finPeriodo"
                            className="form-select"
                            aria-label="finPeriodo"
                            ref={periodoFin}
                            disabled={periodoInicio === "0"}>
                            {periodoInicio === "0" ? <option value="0" key={0}>-</option> : periodosFin.map(periodo => {
                                return (
                                    <option value={periodo.idperiodo} key={periodo.idperiodo}>
                                        {periodo.periodo}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className="col-6 col-sm-3 col-lg-4 mb-2">
                <label htmlFor="dateSelector" className="form-label">Fecha</label>
                <input type="date" id='dateSelector' className="form-control"
                    defaultValue={fecha} min={fechaActual} ref={inputFecha} />
            </div>
            <div className="col-6 col-sm-3 col-lg-2" style={{ marginTop: "30px" }}>
                <div className="row w-100" style={{ marginLeft: "0" }}>
                    <button type="button" className="btn btn-primary" id='searchButton' onClick={handleSearch}>
                        <i className="bi bi-search"></i> Buscar
                    </button>
                </div>
            </div>
        </div>
    );
};