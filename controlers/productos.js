const {request, response} = require('express');
const Product = require('../models/productos');

const getProducts = async (req = request, res = response) => {
    const { hasta = 5, desde = 0 } = req.query;
    const [total, productos] = await Promise.all([
        Product.countDocuments({estado: true}),
        Product.find({estado: true})
               .populate('usuario', 'nombre')
               .populate('categoria', 'name')
               .skip(Number(desde))
               .limit(parseInt(hasta))
    ]);
    return res.json({
        total,
        productos
    });
}

const getProduct = async(req = request, res = response) => {
    const id = req.params.id
    const category = await Product.findById(id)
                                  .populate('categoria', 'name')
                                  .populate('usuario', 'nombre')
    return res.json(category);
}

const createProduct = async (req = request, res = response) => {
    const { estado, usuario, descripcion, ...rest } = req.body;
    const name = req.body.name.toUpperCase();
    const existProduct = await Product.findOne({name});
    if (existProduct) return res.json(`El producto "${name}" ya existe`);
    const data = {
        ...rest,
        name,
        descripcion,
        usuario: req.usuario._id,
    };
    const product = new Product(data);
    await product.save();
    return res.status(201).json(product);
}

const updateProduct = async(req = request, res = response) => {
    const {id} = req.params;
    const {nombre, estado, usuario, ...data} = req.body;
    const product = {
        ...data,
        name: nombre.toUpperCase()
    }
    const productToSave = await Product.findByIdAndUpdate(id, product, {new:true});
    return res.json({productToSave});
}

const deleteProduct = async (req = request, res = response) => {
    const { id } = req.params;
    const productToSave = await Product.findByIdAndUpdate(id, {estado: false}, {new:true});
    return res.json({productToSave});
}


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}