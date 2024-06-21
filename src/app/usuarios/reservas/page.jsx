import Link from 'next/link';
import { fetchAulas, fetchPeriodos, fetchReservasPorAula, fetchReservasPorDocente } from '@/utils/data';
import dayjs from 'dayjs';
import TablaReservasU from '@/components/TablaReservasU';
import {cookies} from "next/headers";
import { redirect } from 'next/navigation';
import Navegador from '@/components/Navegador';
import { fetchUsuarios } from "@/utils/data";

export default async function Reservas({searchParams}) {

    cookies().get("tipo-usuario") === undefined ? redirect("/") : null;  
    const usuarioc = cookies().get("nombre-usuario")?.value;
    const tipo = cookies().get("tipo-usuario")?.value;
    const idusuario = searchParams.idusuario;
    
    
    const reservas = await fetchReservasPorDocente(idusuario);

    const usuarios = await fetchUsuarios(idusuario);
    const usuario = usuarios[0]
    const aulas = await fetchAulas(0)
    const periodos = await fetchPeriodos()
    

    
 
    return (
        <div className="d-flex flex-column contenido mt-2">
            <Navegador usuario={usuarioc} tipo={tipo}/>
            <h4 className="text-primary">docente: {usuario.nombreusuario}</h4>
            <div className="row">
                <div className="col-12 col-md-6">
                    <h4 className='text-primary'>correo: {usuario.dircorreo} </h4>
                </div>
                
            </div>
            
            <TablaReservasU reservas = {reservas} aulas = {aulas} periodos = {periodos}/>
            <div className="col-2 mt-3 mb-2">
                <Link
                    href={{ pathname: "/usuarios" }}
                    className='btn btn-primary'>
                    Atrás
                </Link>
            </div>
        </div>
    );
};