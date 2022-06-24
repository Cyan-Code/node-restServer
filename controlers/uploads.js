const { response, request } = require("express");
const path = require('path');
const fs = require('fs');

const uploadFile = require("../helpers/upload-files");

const cargarArchivo = async (req = request, res = response) => {
    try {
        const nameFile = await uploadFile(req.files, undefined, '');
        return res.json({
            nameFile
        })
    } catch (error) {
        return res.status(500).json({
            msg: `${error}`
        })
    }
}

const updateFile = async (req = request, res = response) => {
    const modelo = req.model;
    const { coleccion } = req.params;
    if (modelo.img) {
        const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img) // Hallar un path existente [el ultimo arg es el nombre de la img]
        if (fs.existsSync(pathImg)) { // pasar path para encontrar un archivo existente
            fs.unlinkSync(pathImg); // Eliminar el archivo
        }
    }
    const pathImg = await uploadFile( req.files, undefined, coleccion);
    modelo.img = pathImg;
    await modelo.save();
    return res.json(modelo);
}

const getImge = async (req = request, res = response) => {
    const modelo = req.model;
    const { coleccion } = req.params;
    if (modelo.img) {
        const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg);
        }
    }
    const noImgPath = path.join(__dirname, '../uploads/placeHolder.jpg');
    return res.sendFile(noImgPath);
}

module.exports = {
    cargarArchivo,
    updateFile, 
    getImge
};
