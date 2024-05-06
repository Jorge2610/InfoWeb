const urlBase = 'http://localhost:3000/api';

export const fetchAulas = async (id) => {
    const res = await fetch(`${urlBase}/aulas/${id}`);
    const datos = await res.json();
    return datos.aulas;
};

export const fetchPeriodos = async () => {
    const res = await fetch(`${urlBase}/periodos`);
    const datos = await res.json();
    return datos.periodos;
};

export const hacerReserva = async (idAula, fecha, idPeriodoInicio, idPeriodoFin, idUsuario) => {
    idAula = parseInt(idAula);
    const datosReserva = { idAula, fecha, idPeriodoInicio, idPeriodoFin, idUsuario };
    const res = await customFetch(`${urlBase}/reservar`, 'POST', datosReserva);
    return res.status;
};

export const fetchReservasPorAula = async (idAula, fecha) => {
    let rangos = await getRangos();
    idAula = parseInt(idAula);
    let reservas = await fetch(`${urlBase}/reservas?idAula=${idAula}&fecha=${fecha}`);
    reservas = await reservas.json();
    rangos = verificarReservas(rangos, reservas.data);
    return rangos;
};

const getRangos = async () => {
    const periodos = await fetchPeriodos();
    const rangos = [];
    for (let i = 0; i < periodos.length - 1; i++) {
        rangos.push({ ...periodos[i], fin: periodos[i + 1].periodo, reservado: false });
    }
    return rangos;
};

const verificarReservas = (rangos, reservas) => {
    reservas.forEach(reserva => {
        let i = 0;
        let encontrado = false;
        while (!encontrado && i < rangos.length) {
            if (rangos[i].idperiodo === reserva.periodoinicio) {
                encontrado = true;
                rangos[i].reservado = true;
            };
            i++;
        };
    });
    return rangos;
};

const customFetch = async (url, metodo, datos) => {
    const res = await fetch(url, {
        method: metodo,
        body: JSON.stringify(datos),
        headers: {
            'content-type': 'application/json'
        }
    });
    return res;
};