const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validarRoles = require('../middlewares/validar-roles');
const validarCategoria = require('../middlewares/validar-categoria');
const validarFile = require('../middlewares/validar-file');

module.exports = {//Importaciones con spread
  ...validarCampos,
  ...validarJWT,
  ...validarRoles,
  ...validarCategoria,
  ...validarFile
}