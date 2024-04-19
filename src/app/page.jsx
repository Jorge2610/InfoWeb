import Link from "next/link";

export default function Home() {
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')

  // const usernameChange = event => {
  // setUsername(event.target.value);
  // }

  // const passwordChange = event => {
  // setPassword(event.target.value)
  // }

  return (
    <section className="container text-center">
      <h1 className="text-center text-primary mt-4">Reserva de Aulas FCyT</h1>
      <div
        className="row justify-content-center"
        style={{ marginTop: "50px"}}
      >
        <div className="col-11 col-sm-8 col-md-6c col-lg-5 col-xl-4">
          <input
            type="text"
            className="form-control icon-p mb-4 "
            placeholder="&#xF4E1; Usuario"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <input
            type="password"
            className="form-control icon-p mb-4"
            placeholder="&#xF600;Contraseña"
          />

          <Link
            type="submit"
            className=" text-center btn btn-primary col-12"
            href="/aulas"
          >
            Ingresar
          </Link>
          <h6 className="text-center mt-3 ">¿Olvidaste tu contraseña?</h6>
        </div>
      </div>
    </section>
  );
}
