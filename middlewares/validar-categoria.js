
const colecciones = [
    'categories',
    'products',
    'roles',
    'usuarios'
]

const isRightColection = (req, res, next) => {
    const { coleccion } = req.params;
    const haveColection = colecciones.includes(coleccion);
    if (!haveColection) {
        return res.status(500).json({
            msg: 'La coleccion no es valida'
        })
    }
    next();
}

module.exports = {
    isRightColection
}
