'use client'
import dayjs from "dayjs";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import Link from "next/link";

export default function Navegador({ usuario, tipo }) {

    const router = useRouter();
    const cerrarSesion = async () => {
        const res = await fetch("/api/auth/logout");
        res.status === 200 ? router.push("/") : null;
    };

    useEffect(() => {
        document !== undefined ? require("bootstrap/dist/js/bootstrap") : null;
    }, []);

    return (
        <div className="pb-2 pt-1 mb-3" style={{ borderBottom: "2px solid #B81F14" }}>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <button className="navbar-toggler mb-3 mb-0-lg" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item nav-li">
                                <Link className="nav-link active" aria-current="page" href={{
                                    pathname: '/aulas',
                                    query: { fecha: dayjs().add(1, "d").format("YYYY-MM-DD"), periodoIni: "0", periodoFin: "0" }
                                }}><i className="bi bi-eye"></i> Aulas</Link>
                            </li>
                            {tipo === "1" ? <>
                                <li className="nav-item nav-li mx-2 hidden">
                                    <div style={{ marginTop: "10px", height: "20px", borderLeft: "1px solid gray" }}></div>
                                </li>
                                <li className="nav-item nav-li">
                                    <Link className="nav-link" href="/usuarios"><i className="bi bi-person-gear"></i> Usuarios</Link>
                                </li>
                                <li className="nav-item nav-li">
                                    <Link className="nav-link" href="https://nextjs.org/docs/app/api-reference/components/link"><i className="bi bi-gear"></i> Aulas</Link>
                                </li>
                            </> : <></>}
                            <li className="nav-item nav-li mx-2 hidden">
                                <div style={{ marginTop: "10px", height: "20px", borderLeft: "1px solid gray" }}></div>
                            </li>
                            <li className="nav-item dropdown nav-li">
                                <div className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false"><i className="bi bi-person"></i> {usuario}</div>
                                <ul className="dropdown-menu p-2" onClick={cerrarSesion}>
                                    <i className="bi bi-box-arrow-left"></i> Cerrar sesión
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};