const { response, request } = require("express");
const uploadFile = require("../helpers/upload-files");

const cargarArchivo = async (req = request, res = response) => {
    try {
        const nameFile = await uploadFile(req.files, ['pdf'], 'pdfs');
        return res.json({
            nameFile
        })
    } catch (error) {
        return res.status(500).json({
            msg: `${error}`
        })
    }
}

const updateFile = (req = request, res = response) => {
    return res.json( 'updateFile' );
}

module.exports = {
    cargarArchivo,
    updateFile
};
