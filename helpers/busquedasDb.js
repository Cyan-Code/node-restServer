const Category = require("../models/category");
const Product = require("../models/productos");
const Usuario = require("../models/usuario");

const { ObjectId } = require("mongoose").Types;

const buscarUsuarios = async (termino = '', res) => {
    const isValidId = ObjectId.isValid(termino);
    if (isValidId) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            result: (usuario) ? [usuario] : []
        });
    }
    const regex = new RegExp(termino, 'i');
    const usuarios = await Usuario.find({
        $or: [{nombre: termino}, {correo: regex}],
        $and: [{estado: true}]
    });
    return res.json({
        results: usuarios
    })
}

const buscarCategorias = async (termino = '', res) => {
    const isValidId = ObjectId.isValid(termino);
    if (isValidId) {
        const category = await Category.findById(termino)
                                       .populate('usuario', 'nombre');
        return res.json({
            result: (category) ? [category] : []
        });
    }
    const regex = new RegExp(termino, 'i');
    const category = await Category.find({name: regex, estado: true})
                                   .populate('usuario', 'nombre');
    return res.json({
        results: category
    });
}

const buscarProductos = async (termino = '', req, res) => {
    const isValid = ObjectId.isValid(termino);
    if (isValid) {
        const product = await Product.findById(termino)
                                     .populate('usuario', 'nombre')
                                     .populate('categoria', 'nombre');
        return res.json({
            result: (product) ? [product] : []
        });
    }
    const regex = new RegExp(termino, 'i');
    const product = await Product.find({name: regex, estado: true})
                                 .populate('usuario', 'nombre')
                                 .populate('categoria', 'name');;
    return res.json({
        results: product
    })
    // body -> Precio, Categoria, disponible[si y no] // ?Pienso hacerlo mediante el body

}

module.exports = {
    buscarUsuarios,
    buscarCategorias,
    buscarProductos
}
