import { crearDaoUsuarios } from '../src/daoUsuarios.js'
import { crearAutorizador } from './autorizarUsuario.js'
import { crearEnviadorEmails } from './enviadorEmails.js'
import { crearUsuario } from './Usuario.js'
import dotenv from 'dotenv'

const datosUsuario = {
    nombreCompleto: 'Tomás Fernández Abrevaya',
    email: 'fernandez.abrevaya@gmail.com',
    diaHorario: 'Viernes a las 19 h',
    frecuenciaEscritura: 'Avanzada',
    generoEscritura: 'Ficción',
    celular: '11-1111-1111'
}

dotenv.config()

const service = process.env.SERVICE
const user = process.env.USER
const pass = process.env.PASS

async function main() {

  const dao = crearDaoUsuarios()
  const usuario = crearUsuario(datosUsuario)
  await dao.add(usuario)
 
  const enviador = await crearEnviadorEmails(service,user,pass)
  const autorizador = await crearAutorizador(dao,enviador)
  await autorizador.autorizarUsuario(usuario.id)
  console.log(await dao.getAll())
}

main()