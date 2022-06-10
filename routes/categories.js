const { Router } = require('express');
const { check } = require('express-validator');

const {
        getCategories,
        getCategory,
        createCategory,
        updateCategory,
        deleteCategory
    } = require('../controlers/category');
const { idCategoryExist } = require('../helpers/db-validators');
const { validarJWT, haveRol, validarCampos } = require('../middlewares');

const router = Router();

//Obtener categorias - publico
router.get('/', getCategories);

//Obtener categoria por id - publico
router.get('/:id', [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( idCategoryExist ),
    validarCampos
], getCategory);

//Crear una categoria - Solo token admitidos
router.post('/', [
    validarJWT,
    haveRol('ADMIN_ROLE', 'VENTAS_ROL'),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], createCategory);

//Actualizar una categoria - Solo token validos
router.put('/:id', [
    validarJWT,
    haveRol('ADMIN_ROLE', 'VENTAS_ROL'),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( idCategoryExist ),
    check('nombre', 'Debes asignar un nuevo nombre').notEmpty(),
    validarCampos
], updateCategory);

//Eliminar categoria por id - Solo administradores
router.delete('/:id', [
    validarJWT,
    haveRol('ADMIN_ROLE'),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom( idCategoryExist ),
    validarCampos
], deleteCategory);

module.exports = router;