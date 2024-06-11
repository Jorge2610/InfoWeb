'use client'
import dayjs from "dayjs";
import { useRouter } from 'next/navigation';
import a from 'next/link';

export default function Navegador({ usuario, tipo }) {

    const router = useRouter();
    const cerrarSesion = async () => {
        const res = await fetch("/api/auth/logout");
        res.status === 200 ? router.push("/") : null;
    };

    return (
        <div className="pb-2 pt-1 mb-3" style={{ borderBottom: "2px solid #B81F14" }}>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item nav-li">
                                <a className="nav-link active" aria-current="page" href={`/aulas?fecha=${dayjs()
                                    .add(1, "d")
                                    .format("YYYY-MM-DD")}&periodoIni=0&periodoFin=0`}><i className="bi bi-eye"></i> Aulas</a>
                            </li>
                            {tipo === "1" ? <>
                                <li className="nav-item nav-li mx-2">
                                    <div style={{ marginTop: "10px", height: "20px", borderLeft: "1px solid gray" }}></div>
                                </li>
                                <li className="nav-item nav-li">
                                    <a className="nav-link" href="#"><i className="bi bi-person-gear"></i> Usuarios</a>
                                </li>
                                <li className="nav-item nav-li">
                                    <a className="nav-link" href="#"><i className="bi bi-gear"></i> Aulas</a>
                                </li>
                            </> : <></>}
                            <li className="nav-item nav-li mx-2">
                                <div style={{ marginTop: "10px", height: "20px", borderLeft: "1px solid gray" }}></div>
                            </li>
                            <li className="nav-item dropdown nav-li">
                                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false"><i className="bi bi-person"></i> {usuario}</a>
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item btn" onClick={cerrarSesion}><i className="bi bi-box-arrow-left"></i> Cerrar sesión</button></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};