const { response, request } = require('express');

const Category = require('../models/category');

const getCategories = async(req = request, res = response) => {
    const {hasta = 5, desde = 0} = req.query;
    const [total, categories] = await Promise.all(//El Val, de la [primera, segunda] ...
        [
            Category.countDocuments({estado: true}),
            Category
                .find({estado:true})
                .populate('usuario', 'name') // Relaciones en Mongoose | "traeme de ese campo, lo que tengas relacionado"
                .skip(Number(desde))
                .limit(parseInt(hasta))// Aqui se ven las relaciones
        ]
    );
    return res.json({
        total, categories
    })
}

const getCategory = async(req = request, res = response) => {
    const category = await Category.findById(req.params.id).populate('usuario', 'name');
    return res.json(category);
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

const updateCategory = async(req = request, res = response) => {
    const {id} = req.params;
    const {nombre, estado, usuario, ...data} = req.body;
    data.name = nombre.toUpperCase();
    data.usuario = req.usuario._id;
    const category = await Category.findByIdAndUpdate(id, data, {new:true});//Tercer argumento ayuda a que se vea la info actualizada de una vez
    return res.json({category});
};

const deleteCategory = async(req = request, res = response) => {
    const {id} = req.params;
    await Category.findByIdAndUpdate(id, {estado: false});
    return res.json('Delete')
};


module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}