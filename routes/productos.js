const { Router } = require('express');
const { check } = require('express-validator');
const { getProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
    } = require('../controlers/productos');
const { idCategoryExist, idProductExist } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares');
const { validarJWT } = require('../middlewares/validar-jwt');
const { haveRol } = require('../middlewares/validar-roles');


const router = Router();

router.get('/', getProducts);
router.get('/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( idProductExist ),
    validarCampos
], getProduct);
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
router.put('/:id', [ 
    validarJWT,
    haveRol('ADMIN_ROLE', 'VENTAS_ROL'),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( idProductExist ),
    check('categoria', 'El id de la categoria es obligatorio').notEmpty(),
    check('categoria', 'Debe ser una categoria valida').isMongoId(),
    check('categoria').custom(idCategoryExist),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], updateProduct);
router.delete('/:id', [
    validarJWT,
    haveRol('ADMIN_ROLE'),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( idProductExist ),
    validarCampos
], deleteProduct);



module.exports = router;
