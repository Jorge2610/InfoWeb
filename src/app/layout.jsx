import { Inter } from "next/font/google";
import "../../scss/custom.scss"
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Reserva de aulas FCyT",
  description: "Desarrollado por InfoWeb 01/2024",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="container page">

          <div className="header pt-1">
            <div className="d-flex justify-content-between col-12" style={{ height: "80%" }}>
              <img src="/logo_umss.png" style={{ width: "auto", height: "180%", marginTop: "-30px" }} alt="UMSS" />
              <img src="/logo_fcyt.png" className="img-fluid" alt="FCyT" />
            </div>
            <div className="d-flex flex-row-reverse align-items-end mt-1" style={{ height: "20%" }}>
              <div className="col-8" style={{ backgroundColor: "#B81F14", height: "85%" }} />
            </div>
          </div>

          <main className="pt-2">
            {children}
          </main>

          <footer className="text-center text-light">
            InfoWeb
          </footer>
        </div>
      </body>
    </html>
  );
}
