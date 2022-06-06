const Role = require('../models/role');
const Usuario = require('../models/usuario');

const emailValido = async (correo = '') => {
  const emailValido = await Usuario.findOne({correo: correo});
  if (emailValido) {
    throw new Error(`El correo ${correo} ya se encuentra registrado`)
  }
}

const esRolValido =  async (rol = '') => {
  const existeRol = await Role.findOne({rol:rol});
  console.log(rol);
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la DB`);
  }
}

const idUserExist =  async ( id ) => {
  const existeId = await Usuario.findById( id );
  if ( !existeId ) {
    throw new Error(`El id < ${id} > no esta registrado en la DB`);
  }
}

module.exports = {
  esRolValido,
  emailValido,
  idUserExist
}
