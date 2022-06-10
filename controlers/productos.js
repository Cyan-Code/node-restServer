const {request, response} = require('express');
const Product = require('../models/productos');

const getProducts = (req = request, res = response) => {
    res.json('gets');
}

const getProduct = (req = request, res = response) => {
    res.json('getP');
}

const createProduct = async (req = request, res = response) => {
    const { estado, usuario, name, descripcion, ...rest } = req.body;
    const product = await Product.findOne({name});
    if (product) return res.json(`El producto "${name}" ya existe`);
    const data = {
        name,
        descripcion,
        usuario: req.usuario._id,
        ...rest
    };
    const productToSave = new Product(data);
    await productToSave.save();
    return res.status(201).json(productToSave);
}

const updateProduct = (req = request, res = response) => {
    res.json('update');
}

const deleteProduct = (req = request, res = response) => {
    res.json('delete');
}


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}