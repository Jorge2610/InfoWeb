'use client'
import React, { useState } from "react";
import { cookies } from "next/headers";
import { useRouter } from 'next/navigation';
import Navegador from '@/components/Navegador';

export default function Registrar() {

  const router = useRouter();
  cookies().get("tipo-usuario") === undefined ? router.push("/") : null;
  const usuario = cookies().get("nombre-usuario")?.value;
  const tipo = cookies().get("tipo-usuario")?.value;
  const [nombre, setNombre] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const aula = { nombre, capacidad, ubicacion, descripcion };
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
        alert('Aula registrada con exito');
      } else {

        alert(`Error: ${result.message}`);
      }


    } catch (error) {
      console.error('Error al registrar el aula: ', error);
      alert('Error al registrar el aula')
    }
  }
  return (
    <div className="container">
      <Navegador usuario={usuario} tipo={tipo}/>
      <h1 className="text-primary text-center">Registrar Aula FCyT</h1>
      <div className="row">
        <div
          className="col-md-5 offset-md-3"
          style={{ marginTop: '40px' }}>
          <div className="form-group ">
            <label htmlFor="nombre" className="text-primary"><b>Nombre</b></label>
            <input
              type="text"
              className="form-control mb-3"
              id="nombre"
              placeholder="Ingrese nombre de aula..."
              onChange={(e) => { setNombre(e.target.value) }}
            />
          </div>
          <div className="form-group mb-3 ">
            <label htmlFor="capacidad" className="text-primary "><b>Capacidad</b></label>
            <input
              type="text"
              className="form-control mb-3"
              id="capacidad"
              placeholder="Capacidad del aula..."
              onChange={(e) => { setCapacidad(e.target.value) }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ubicacion" className="text-primary"><b>Ubicación</b></label>
            <input
              type="text"
              className="form-control mb-3"
              id="ubicacion"
              placeholder="Ubicación del aula..."
              onChange={(e) => { setUbicacion(e.target.value) }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="descripcion" className="text-primary"><b>Descripción</b></label>
            <textarea
              type="text"
              className="form-control mb-5"
              id="descripcion"
              placeholder="Descripcion del aula..."
              style={{ height: '100px' }}
              onChange={(e) => { setDescripcion(e.target.value) }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <button className="btn btn-primary red">Cancelar</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Guardar</button>
        </div>
      </div>
    </div>
  );
}
