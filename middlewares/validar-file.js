
const fileValidator = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.json({msg: 'No hay arhivos que subir'});
    }
    next();
};

module.exports = {
    fileValidator
};
