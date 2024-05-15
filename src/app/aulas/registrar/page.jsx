export default function Registrar() {
  return (
    <div className="container">
      <h1 className="text-primary text-center">Registrar Aula FCyT</h1>
      <div className="row">
        <div 
        className="col-md-5 offset-md-3"
        style={{marginTop:'40px'}}>
          <div className="form-group ">
            <label htmlFor="nombre" className="text-primary"><b>Nombre</b></label>
            <input
              type="text"
              className="form-control mb-3"
              id="nombre"
              placeholder="Ingrese su nombre..."
            />
          </div>
          <div className="form-group mb-3 ">
            <label htmlFor="capacidad" className="text-primary "><b>Capacidad</b></label>
            <input
              type="text"
              className="form-control mb-3"
              id="capacidad"
              placeholder="Capacidad del aula..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="ubicacion" className="text-primary"><b>Ubicación</b></label>
            <input
              type="text"
              className="form-control mb-3"
              id="ubicacion"
              placeholder="Ubicación del aula..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="ubicacion" className="text-primary"><b>Descripción</b></label>
            <textarea
              type="text"
              className="form-control mb-5"
              id="ubicacion"
              placeholder="Descripcion del aula..."
              style={{height:'100px'}}
            />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent:'space-around'}}>
            <button className="btn btn-primary red">Cancelar</button>
            <button className="btn btn-primary">Guardar</button>
        </div>
      </div>
    </div>
  );
}
