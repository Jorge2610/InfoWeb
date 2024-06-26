import Link from 'next/link';
import { fetchAulas, fetchReservasPorAula } from '@/utils/data';
import dayjs from 'dayjs';
import TablaReserva from '@/components/TablaReserva';
import {cookies} from "next/headers";
import { redirect } from 'next/navigation';
import Navegador from '@/components/Navegador';
import { fetchUsuarios } from "@/utils/data";

export default async function ReservaAula({ searchParams }) {

    cookies().get("tipo-usuario") === undefined ? redirect("/") : null;  
    const usuario = cookies().get("nombre-usuario")?.value;
    const tipo = cookies().get("tipo-usuario")?.value;
    const idAula = searchParams.aula;
    const fecha = searchParams.fecha;
    
    const aula = (await fetchAulas(idAula))[0];
    const reservas = await fetchReservasPorAula(idAula, fecha);

    const usuarios = await fetchUsuarios(0);

    const usuariobd = usuarios.find(user => user.nombreusuario === usuario);

    
 
    return (
        <div className="d-flex flex-column contenido mt-2">
            <Navegador usuario={usuario} tipo={tipo}/>
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
            <TablaReserva reservas={reservas} idAula={idAula} fecha={fecha} aula={aula.nombre} idUsuario = {usuariobd.idusuario}/>
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