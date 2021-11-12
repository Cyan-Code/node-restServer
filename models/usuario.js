
const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El Nombre es obligatorio']
  },
  correo: {
    type: String,
    required: [true, 'El Correo es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La Contraseña es obligatorio']
  },
  img: {
    type: String
  },
  rol: {
    type: String,
    required: true,
    enum: ['ADMIN_ROLE', 'USER_ROL', 'VENTAS_ROL'] // Docs
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
})

UsuarioSchema.methods.toJSON = function() {
  const {__v, password, _id:uid, ...usuario} = this.toObject();
  return {
    uid, ...usuario
  };
}

module.exports = model( 'Usuario', UsuarioSchema ) //Docs
