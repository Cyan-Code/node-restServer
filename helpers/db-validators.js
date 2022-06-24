const Category = require('../models/category');
const Product = require('../models/productos');
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

const idCategoryExist = async (id) => {
  const category = await Category.findById(id);
  if (!category) {
      throw new Error(`No se encontro categoria con el id: ${id}`);
  }
}

const idProductExist = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new Error(`No se encontro este producto ${id}`);
}

const availableColections = (coleccion='', coleccions = []) => {
  const include = coleccions.includes(coleccion);
  console.log(include)
  if (!include) {
    throw new Error(`La Colecion ${ coleccion } no esta permitida`);
  }
  return true //Reasons but this works? and the others doesnt need this???
}

module.exports = {
  esRolValido,
  emailValido,
  idUserExist,
  idCategoryExist,
  idProductExist,
  availableColections
}
