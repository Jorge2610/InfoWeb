export const fetchAulas = async (id) => {
    const res = await fetch(`http://localhost:3000/api/aulas/${id}`);
    const datos = await res.json();
    return datos.aulas;
};

export const fetchPeriodos = async () => {
    const res = await fetch(`http://localhost:3000/api/periodos`);
    const datos = await res.json();
    return datos.periodos;
};