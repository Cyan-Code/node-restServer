const { Router } = require('express');
const { check } = require('express-validator');
const { updateFile, cargarArchivo } = require('../controlers/uploads');
const { availableColections } = require('../helpers/db-validators');
const { fileValidator, validarCampos } = require('../middlewares');

const router = Router();

router.post('/', [
    fileValidator
], cargarArchivo)

router.put('/:coleccion/:id', [
    check('id', 'Debe ser un mongo ID').isMongoId(),
    check('coleccion').custom(c => availableColections(c, ['usuarios', 'products'])),
    validarCampos
], updateFile)

module.exports = router;