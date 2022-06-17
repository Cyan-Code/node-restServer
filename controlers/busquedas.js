const {request, response} = require('express');

const busqueda = (req = request, res = response) => {
    //TODO: Hacer las funciones async que resivan la request y el 
            //TODO: termino limpio pero que hagan las consultas [NO SE SI SE PUEDA]
    res.json('Buscar...');
}



module.exports = {
    busqueda
}