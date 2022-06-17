//const { isValidObjectId } = require("mongoose"); Otra forma de validar el id

const Usuario = require("../models/usuario");

const { ObjectId } = require("mongoose").Types;

const buscarUsuarios = async (termino = '', res) => {
    const isValidId = ObjectId.isValid(termino);
    if (isValidId) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            result: (usuario) ? [usuario] : [] // Nueva forma de usar el retorno
        });
    }
}//TODO: HERE!!

