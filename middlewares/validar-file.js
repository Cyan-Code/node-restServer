const Product = require("../models/productos");
const Usuario = require("../models/usuario");

const fileValidator = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.json({msg: 'No hay arhivos que subir'});
    }
    next();
};

const findModel = async (req = request, res = response, next) => {
    const {id, coleccion} = req.params;
    let modelo;
    switch (coleccion) {
        case 'products':
            modelo = await Product.findById(id);
            if (!modelo) return res.status(500).json({msg: `No existe un producto con el id: ${id}`})
            req.model = modelo
            next();
        break;
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) return res.status(500).json({msg: `No existe un producto con el id: ${id}`})
            req.model = modelo
            next();
        break;
        default:
            return res.status(500).json({msg: 'Ups, algo salio mal en la validacion'})
    }
}

module.exports = {
    fileValidator,
    findModel
};
