const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSingIn } = require('../controlers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',[
  check('correo', 'El corre es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  validarCampos
], login);

router.post('/google',[
  check('id_token', 'id_token obligatorio').not().isEmpty(),
  validarCampos
], googleSingIn);



module.exports = router;
