const { Router } = require('express');
const { check } = require('express-validator');

const {
        getCategories,
        getCategory,
        createCategory,
        updateCategory,
        deleteCategory
    } = require('../controlers/category');
const { validarJWT, haveRol, validarCampos } = require('../middlewares');

const router = Router();

//Obtener categorias - publico
router.get('/', getCategories);

//Obtener categoria por id - publico
router.get('/:id', getCategory);

//Crear una categoria - Solo token admitidos
router.post('/', [
    validarJWT,
    haveRol('ADMIN_ROLE', 'VENTAS_ROL'),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], createCategory);

//Actualizar una categoria - Solo token validos
router.put('/:id', updateCategory);

//Eliminar categoria por id - Solo administradores
router.delete('/:id', deleteCategory);

module.exports = router;