import { useRef } from "react";

export default function Modal({ id, titulo, data, cancelar, confirmar }) {

    const motivo = useRef(null);

    const deleteData = () => {
        motivo.current.value = "";
        cancelar(data.index);
    };

    return (
        <div className="modal fade" id={id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`staticBackdropLabel${id}`} aria-hidden="true">
            <div className="modal-dialog modal-sm modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id={`staticBackdropLabel${id}`}>{titulo}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={e => deleteData()}></button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex justify-content-between">
                            <span><b>Aula:</b> {data.aula}</span><span><b>Fecha:</b> {data.fecha}</span>
                        </div>
                        <p className="mb-0"><b>Hora de inicio:</b> {data.inicio}</p>
                        <p className="mb-0"><b>Hora de fin:</b> {data.fin}</p>
                        <label htmlFor="motivo"><b>Motivo de la reserva:</b></label>
                        <textarea style={{ width: '100%', height: '80px', resize: 'none' }}
                            name="motivo"
                            id="motivo"
                            ref={motivo}
                            maxLength={75}
                            placeholder="Motivo...">
                        </textarea>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={e => deleteData()}>Cancelar</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={e => confirmar(data.index)}>Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};