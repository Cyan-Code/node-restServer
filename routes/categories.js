const { Router } = require('express');

const router = Router();

//Obtener categorias - publico
router.get('/', (req, res) => {
    res.json('get');
});

//Obtener categoria por id - publico
router.get('/:id', (req, res) => {
    res.json('get-id')
});

//Crear una categoria - Solo token admitidos
router.post('/', (req, res)=>{
    res.json('post')
})

//Actualizar una categoria - Solo token validos
router.put('/:id', (req, res) => {
    res.json('put')
})

//Eliminar categoria por id - Solo administradores
router.delete('/:id', (req, res) => {
    res.json('delete')
})

module.exports = router;