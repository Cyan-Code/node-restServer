const { Router } = require('express');
const { check } = require('express-validator');
const { updateFile, cargarArchivo, getImge } = require('../controlers/uploads');
const { availableColections } = require('../helpers/db-validators');
const { findModel ,fileValidator, validarCampos } = require('../middlewares');

const router = Router();

//En esta ruta, es obvio que se deben de agregar validaciones de sesion o token
router.post('/', [
    fileValidator
], cargarArchivo)

router.put('/:coleccion/:id', [
    fileValidator,
    check('id', 'Debe ser un mongo ID').isMongoId(),
    check('coleccion').custom(c => availableColections(c, ['usuarios', 'products'])),
    findModel,
    validarCampos
], updateFile)

router.get('/:coleccion/:id', [
    check('id', 'Debe ser un mongo ID').isMongoId(),
    check('coleccion').custom(c => availableColections(c, ['usuarios', 'products'])),
    findModel,
    validarCampos
], getImge)

module.exports = router;