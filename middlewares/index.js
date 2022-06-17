const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validarRoles = require('../middlewares/validar-roles');
const validarCategoria = require('../middlewares/validar-categoria');

module.exports = {//Importaciones con spread
  ...validarCampos,
  ...validarJWT,
  ...validarRoles,
  ...validarCategoria
}