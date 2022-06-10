const { Router } = require('express');
const { check } = require('express-validator');
const { getProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
    } = require('../controlers/productos');
const { idCategoryExist } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares');
const { validarJWT } = require('../middlewares/validar-jwt');
const { haveRol } = require('../middlewares/validar-roles');


const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', [
    validarJWT,
    haveRol('ADMIN_ROLE', 'VENTAS_ROL'),
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('descripcion', 'La descriptcion es obligatoria').notEmpty(),
    check('categoria', 'El id de la categoria es invalido').isMongoId(),
    check('categoria', 'El id de la categoria es obligatorio').notEmpty(),
    check('categoria').custom(idCategoryExist),
    validarCampos
], createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);



module.exports = router;
