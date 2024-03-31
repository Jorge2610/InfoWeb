import Link from 'next/link'

const dayjs = require('dayjs');
let date = dayjs();
date = date.add(1, "d").format("YYYY-MM-DD");

const periodos = [];
let periodoInicial = dayjs().set('hour', 6).set('minute', 45).set('second', 0);
for (let i = 1; i < 11; i++) {
    let periodoPrevio = periodoInicial;
    periodoInicial = periodoInicial.add(90, 'minute');
    let periodo = { id: i, rango: periodoPrevio.format("HH:mm") + " - " + periodoInicial.format("HH:mm") };
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
        console.log("holas1");
    };

    return (
        <div className='mt-2'>
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
                        <button type="button" className="btn btn-primary" id='searchButton'>
                            <i className="bi bi-search"></i> Buscar
                        </button>
                    </div>
                </div>
            </div>
            <div style={{ maxHeight: "62vh", overflowY: "auto" }}>
                <table className="table mt-3">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Aula</th>
                            <th scope="col">Capacidad</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aulas.map((aula) => {
                            return (
                                <tr key={aula.id}>
                                    <th scope="row">{aula.id}</th>
                                    <td>{aula.aula}</td>
                                    <td>{aula.capacidad}</td>
                                    <td>@mdo</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="col-2 mt-3 mb-2">
                <div className="row ms-0">
                    <Link className="btn btn-primary" href="/">Atrás</Link>
                </div>
            </div>
        </div>
    );
}