"use client";
import React, { useRef, useState } from "react";
import Navegador from '@/components/Navegador';


const Registro = ({usuario, tipo}) => {
  
  const nombre = useRef('');
  const capacidad = useRef('');
  const ubicacion = useRef('');
  const descripcion = useRef('');

  const [message, setMessage] = useState('');
  const [isError, setError] = useState(false);

  const handleInputChange = (e,ref, type = 'alphanumeric') => {
  const {value} = e.target;
  let filteredValue = value;

  if(type === 'numeric') {
    filteredValue = value.replace(/[^0-9]/g,"");
  } else {
    filteredValue = value.replace(/[^a-zA-Z0-9ÁÉÍÓÚáéíóúüÜñÑ\- ]/g, "");
  }
    ref.current = filteredValue;
    e.target.value = ref.current;
  };

  const handleCancelar = () => {
    setMessage('');
    setError(false);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const aula = { 
      nombre: nombre.current,
      capacidad: capacidad.current, 
      ubicacion: ubicacion.current, 
      descripcion: descripcion.current
    };

    try {
      const res = await fetch('/api/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(aula),
      });

      const result = await res.json();
      if (res.ok) {
        setMessage('Aula registrada con exito');
        setError(false);
      } else {
        setMessage(`Error: ${result.message}`)
        setError(true);
      }


    } catch (error) {
      console.error('Error al registrar el aula: ', error);
      setMessage('Error al registrar el aula');
      setError(true);
    }
  }
    return (
        <div className="container">
            <Navegador usuario={usuario} tipo={tipo} />
            <h1 className="text-primary text-center">Registrar Aula FCyT</h1>
            {message && (
              <div
              className={`alert ${isError ? "alert-danger": "alert-success" }`}
              role="alert"
              > 
              {message}
              </div>

            )}
            <div className="row">
                <div
                    className="col-md-5 offset-md-3"
                    style={{ marginTop: "40px" }}
                >
                    <div className="form-group ">
                        <label htmlFor="nombre" className="text-primary">
                            <b>Nombre</b>
                        </label>
                        <input
                            type="text"
                            className="form-control mb-3"
                            id="nombre"
                            placeholder="Ingrese nombre de aula..."
                            onChange={(e) => handleInputChange(e,nombre)}
                        />
                    </div>
                    <div className="form-group mb-3 ">
                        <label htmlFor="capacidad" className="text-primary ">
                            <b>Capacidad</b>
                        </label>
                        <input
                            type="text"
                            className="form-control mb-3"
                            id="capacidad"
                            placeholder="Capacidad del aula..."
                            onChange={(e) => handleInputChange(e,capacidad,"numeric")}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ubicacion" className="text-primary">
                            <b>Ubicación</b>
                        </label>
                        <input
                            type="text"
                            className="form-control mb-3"
                            id="ubicacion"
                            placeholder="Ubicación del aula..."
                            onChange={(e) => handleInputChange(e,ubicacion)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descripcion" className="text-primary">
                            <b>Descripción</b>
                        </label>
                        <textarea
                            type="text"
                            className="form-control mb-5"
                            id="descripcion"
                            placeholder="Descripcion del aula..."
                            style={{ height: "100px" }}
                            onChange={(e) => handleInputChange(e, descripcion)}
                        />
                    </div>
                </div>
                <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                >
                    <button className="btn btn-primary red" onClick={handleCancelar}>Cancelar</button>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Registro;
