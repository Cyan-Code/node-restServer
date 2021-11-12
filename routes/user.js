const { Router } = require('express');
const { check } = require('express-validator');

const { esRolValido, emailValido, idUserExist } = require('../helpers/db-validators');

const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete } = require('../controlers/user');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', usersGet );

router.put('/:id',[
  check('id', 'El id no es valido').isMongoId(),
  check('id').custom( idUserExist ),
  check('rol').custom( esRolValido ),
  validarCampos
], usersPut );

router.post('/',[
  check('nombre', 'El nombre no es valido').not().isEmpty(),
  check('password', 'El password no es valido').isLength({min: 6}),
  check('correo', 'El correo no es valido').isEmail(),
  check('correo').custom( emailValido ),
  check('rol').custom( esRolValido ),
  validarCampos
], usersPost);

router.delete('/:id',[
  validarJWT,
  check('id', 'El id no es valido').isMongoId(),
  check('id').custom( idUserExist ),
  validarCampos
], usersDelete);








module.exports = router;
