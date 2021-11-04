const {Router} = require('express');
const { check } = require('express-validator');

const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete } = require('../controlers/user');
const { esRolValido } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usersGet );

router.put('/:id', usersPut );

router.post('/',[
  check('nombre', 'El nombre no es valido').not().isEmpty(),
  check('password', 'El password no es valido').isLength({min: 6}),
  check('correo', 'El correo no es valido').isEmail(),
  //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('rol').custom( esRolValido ),
  validarCampos
], usersPost);

router.delete('/', usersDelete);








module.exports = router;
