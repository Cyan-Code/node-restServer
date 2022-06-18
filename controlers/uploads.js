const { response, request } = require("express");

const cargarArchivo = (req = request, res = response) => {
    res.json({
        result: 'Cargar Archivo...'
    });
}


module.exports = cargarArchivo;
