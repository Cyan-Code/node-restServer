const {request, response} = require('express');
const { buscarUsuarios,
        buscarCategorias,
        buscarProductos } = require('../helpers/busquedasDb');
//'roles'

const busqueda = (req = request, res = response) => {
    const { coleccion, termino } = req.params;
    switch (coleccion) {
        case 'usuarios':
            return buscarUsuarios(termino, res);
        case 'products':
            return buscarProductos(termino, req, res);
        case 'categories':
            return buscarCategorias(termino, res)
        default:
            break;
    }
    res.json('Buscar...');
}

module.exports = {
    busqueda
}