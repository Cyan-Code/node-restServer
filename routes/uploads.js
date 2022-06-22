const { Router } = require('express');
const { check } = require('express-validator');
const cargarArchivo = require('../controlers/uploads');
const { fileValidator } = require('../middlewares');

const router = Router();

router.post('/', [
    fileValidator
], cargarArchivo)


module.exports = router;