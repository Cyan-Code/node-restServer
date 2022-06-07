const { response, request } = require('express');
const { isValidObjectId } = require('mongoose');

const Category = require('../models/category');

const getCategories = async(req = request, res = response) => {
    const {hasta = 5, desde = 0} = req.query;
    const [total, categories] = await Promise.all(//El Val, de la [primera, segunda] ...
        [
            Category.countDocuments({estado: true}),
            Category
                .find({estado:true})
                .populate('usuario') // Relaciones en Mongoose | "traeme de ese campo, lo que tengas relacionado"
                .skip(Number(desde))
                .limit(parseInt(hasta))// Aqui se ven las relaciones
        ]
    );
    return res.json({
        total, categories
    })
}

const getCategory = async(req = request, res = response) => {
    const {id} = req.params;
    const isValid = isValidObjectId(id);
    if (!isValid) {
        return res.status(400).json('Id no valido')
    }
    //Verificar que el id exista y sea de mongo
    const category = await Category.findById(id);
    if (!category) {
        return res.status(404).json('Categoria no encontrada');
    }
    res.json('get-id')
};

const createCategory = async (req = request, res = response) => {
    const name = req.body.nombre.toUpperCase();
    const existCategory = await Category.findOne({name})
    if (existCategory) {
        return res.status(400).json({
            msg: `la categoria ${name} ya existe`
        });
    }
    // Generate data to save
    const data = {
        name,
        usuario: req.usuario._id //new ObjectId("ID") (relations in mongo)
    }
    const category = new Category(data)
    await category.save();
    return res.status(201).json(category);
};

const updateCategory = (req, res = response) => {
    res.json('update')
};

const deleteCategory = (req, res = response) => {
    res.json('Delete')
};


module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}