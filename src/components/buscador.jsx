'use client'
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

export default function Buscador({ periodos, fecha, idSelected }) {

    const inputFecha = useRef(null);
    const selectPeriodo = useRef(null);
    const router = useRouter();
    const fechaActual = dayjs().add(1, "d").format("YYYY-MM-DD");

    const handleSearch = () => {
        const ruta = `/aulas?fecha=${inputFecha.current.value}&periodo=${selectPeriodo.current.value}`
        router.push(ruta);
    };

    return (
        <div className="mt-3 row">
            <div className="col-12 col-sm-5 col-lg-5 mb-2">
                <label htmlFor="dateSelector" className="form-label">Fecha</label>
                <input type="date" id='dateSelector' className="form-control"
                    defaultValue={fecha} min={fechaActual} ref={inputFecha} />
            </div>
            <div className={"col-7 col-sm-4 col-lg-5"}>
                <label htmlFor="periodSelector" className="form-label">Periodo</label>
                <select className="form-select" aria-label="periodSelector" ref={selectPeriodo} defaultValue={idSelected}>
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
            <div className="col-5 col-sm-3 col-lg-2" style={{ marginTop: "30px" }}>
                <div className="row w-100">
                    <button type="button" className="btn btn-primary" id='searchButton' onClick={handleSearch}>
                        <i className="bi bi-search"></i> Buscar
                    </button>
                </div>
            </div>
        </div>
    );
};