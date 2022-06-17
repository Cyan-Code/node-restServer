const {request, response} = require('express');
const { buscarUsuarios,
        buscarCategorias,
        buscarProductos } = require('../helpers/busquedasDb');
//'roles'

const busqueda = (req = request, res = response) => {
    const { coleccion, termino } = req.params;
    switch (coleccion) {
        case 'usuarios':
            return buscarUsuarios(termino, res);//Nueva forma de aplicar el response a funciones que no sean middlewares ni controladores
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