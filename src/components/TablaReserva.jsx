'use client'
import { hacerReserva } from "@/utils/data";
import { useEffect, useState } from "react";
import { socket } from "@/utils/socket";
import Modal from "@/components/Modal";
import dayjs from 'dayjs';

export default function TablaReserva({ reservas, idAula, fecha, aula }) {

    const [data, setData] = useState(reservas);
    const [modalData, setModalData] = useState(
        {
            index: 0,
            aula: aula,
            fecha: dayjs(fecha).format("DD/MM/YYYY"),
            inicio: "",
            fin: ""
        }
    );
    const [status, setStatus] = useState(500);

    const inicializarSocket = () => {
        socket.on("bloquear-reserva", (msg) => {
            if (msg.idAula === idAula && msg.fecha === fecha) {
                setData(msg.data);
            }
        });
    };

    useEffect(() => {
        inicializarSocket();
        document !== undefined ? require("bootstrap/dist/js/bootstrap") : null;
    }, []);

    const realizarReserva = async (index) => {
        const idPeriodoFin = data[index].idperiodo + 1;
        const alerta = document.getElementById('alerta');
        setStatus(0);
        alerta.removeAttribute('hidden');
        const res = await hacerReserva(idAula, fecha, data[index].idperiodo, idPeriodoFin, 1);
        res === 200 ? bloquearReserva(index, 0) : cancelarProcesoReserva();
        setStatus(res);
        setTimeout(() => {
            alerta.setAttribute('hidden', 'true');
        }, 4000);
    };

    const bloquearReserva = (index, target) => {
        const newData = JSON.parse(JSON.stringify(data));
        if (target === 0) {
            newData[index].reservado = true;
            setData(newData);
        } else {
            newData[index].proceso = true;
        }
        socket.emit("control-reserva", { idAula: idAula, fecha: fecha, data: newData });
    };

    const actualizarDatosModal = (index) => {
        const newModalData = { ...modalData };
        newModalData.index = index;
        newModalData.inicio = data[index].periodo;
        newModalData.fin = data[index].fin;
        setModalData(newModalData);
    };

    const iniciarProcesoReserva = (index) => {
        actualizarDatosModal(index);
        bloquearReserva(index, 1);
    };

    const cancelarProcesoReserva = () => {
        socket.emit("control-reserva", { idAula: idAula, fecha: fecha, data: data });
    };

    return (
        <>
            <div className={`alert alert-${status === 200 ? 'success' : status === 0 ? 'info' : 'danger'} mt-3 mb-0`}
                role="alert"
                hidden
                id="alerta">
                {status === 200 ?
                    '¡La reserva fue completada exitosamente!'
                    :
                    status === 0 ?
                        <div className="d-flex align-items-center">
                            <div className="spinner-border me-3" aria-hidden="true"></div>
                            <span role="status">La reserva esta siendo procesada. Por favor espere...</span>
                        </div>
                        :
                        'No se pudo completar la reserva. Por favor, inténtelo nuevamente.'
                }
            </div>
            <div className='flex-grow-1 mt-3' style={{ overflowY: "auto" }}>
                <Modal
                    id="modalReserva"
                    titulo="Confirmar reserva"
                    data={modalData}
                    cancelar={cancelarProcesoReserva}
                    confirmar={realizarReserva} />
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
                        {data.map((rango, index) => {
                            return (
                                <tr key={rango.idperiodo}>
                                    <th scope="row">{rango.idperiodo}</th>
                                    <td className='text-center'>{rango.periodo}</td>
                                    <td className='text-center'>{rango.fin}</td>
                                    <td className='text-center'>
                                        <button
                                            className={`btn btn-outline-${rango.proceso ? 'info' : rango.reservado ? 'secondary' : 'primary'}`}
                                            disabled={rango.reservado || rango.proceso}
                                            title="Reservar periodo"
                                            onClick={e => iniciarProcesoReserva(index)}
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalReserva"
                                            style={{ width: '110px' }}>
                                            {rango.reservado ? 'Reservado' :
                                                rango.proceso ?
                                                    <div className="spinner-border spinner-border-sm text-info" role="status">
                                                        <span className="visually-hidden">Proceso...</span>
                                                    </div>
                                                    :
                                                    'Reservar'}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};