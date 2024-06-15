import Registro from "@/components/Registro";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';


export default function Registrar() {

  const tipoUsuario = cookies().get('tipo-usuario')
  
  if(!tipoUsuario) {
    redirect('/');
  }
  const usuario = cookies().get('nombre-usuario')?.value;
  const tipo = tipoUsuario?.value;

  return <Registro usuario={usuario} tipo={tipo}/>
}
