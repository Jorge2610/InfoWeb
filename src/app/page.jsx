export default function Home() {
  return (
    <section className="container">
      <h1 className="text-center">RESERVA DE AULAS</h1>
      <div className="d-grid gap-4 col-3 mx-auto">
        <button type="button" className="btn btn-primary">
          Edificio nuevo
        </button>
        <button type="button" className="btn btn-primary">
          Bloque trencito
        </button>
        <button type="button" className="btn btn-primary">
          Edificio Cad-Cam
        </button>
      </div>
    </section>
  );
}