"use client";
import dayjs from "dayjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const [usuario, setUsuario] = useState("");
    const [contrasenia, setContrasenia] = useState("");
    const [error, setError] = useState(null);
    const [visible, setVisible] = useState(false);
    const router = useRouter();

    const handleVisible = () => {
        setVisible(!visible);
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    nombreusuario: usuario,
                    contrasenia: contrasenia,
                }),
            });
            const result = await res.json();
            if (res.ok) {
                router.push(
                    `/aulas?fecha=${dayjs()
                        .add(1, "d")
                        .format("YYYY-MM-DD")}&periodoIni=0&periodoFin=0`
                );
            } else {
                setError(result.message || "Error al autenticar el usuario");
            }
        } catch (err) {
            setError("Error de red o del servidor");
        }
    };

    return (
        <section className="container text-center">
            <h1 className="text-center text-primary mt-4">
                Reserva de Aulas FCyT
            </h1>
            <div
                className="row justify-content-center"
                style={{ marginTop: "50px" }}
            >
                <div className="col-11 col-sm-8 col-md-6c col-lg-5 col-xl-4">
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            className="form-control icon-p mb-4 "
                            placeholder="&#xF4E1; Usuario"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                        />

                        <div className="input-group mb-4">
                            <input
                                type= {visible ? "text" : "password"}
                                className="form-control icon-p border-del "
                                placeholder="&#xF600;Contraseña"
                                value={contrasenia}
                                onChange={(e) => setContrasenia(e.target.value)}
                            />
                            <span className="input-group-text" onClick={handleVisible}>
                                {visible ? (
                                    <span className="icon-p">&#xF341;</span>
                                ) : (
                                    <span className="icon-p">&#xF340;</span>
                                )}
                            </span>
                        </div>

                        <button
                            type="submit"
                            className=" text-center btn btn-primary col-12"
                        >
                            Ingresar
                        </button>
                    </form>
                    {error && <div className="text-danger mt-3">{error}</div>}
                    <h6 className="text-center mt-3 ">
                        ¿Olvidaste tu contraseña?
                    </h6>
                </div>
            </div>
        </section>
    );
}
