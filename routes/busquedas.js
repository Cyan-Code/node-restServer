const { Router } = require('express');
const { busqueda } = require('../controlers/busquedas');
const { isRightColection } = require('../middlewares');

const router = Router();

router.get('/:coleccion/:termino', [
    isRightColection    
], busqueda)



module.exports = router;
