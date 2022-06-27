const path = require('path');
const {v4: uuidv4} = require('uuid');

const defaultExtensions = ['png', 'jpg', 'jpeg', 'gif'];

const uploadFile = (files, availableExtensions = defaultExtensions, folder = '') => {
    return new Promise ( (resolve, reject) => {
        const { archivo } = files;
        const nameTrunc = archivo.name.split('.');
        const extension = nameTrunc[nameTrunc.length - 1];
        if (!availableExtensions.includes(extension)) {
            return reject(`La extension ${extension}, no es permitida`);
        }
        const fileNameId = uuidv4() + '.' + extension;
        const fileUploadPath = path.join(__dirname, '../uploads/', folder, fileNameId);
        
        archivo.mv( fileUploadPath, (err) => {
            if (err) { return reject(err) }
                else { return resolve(fileNameId)}
        });
    });
}

module.exports = uploadFile;
