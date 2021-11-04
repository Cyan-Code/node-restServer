const {response} = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

const usersGet = (req, res = response) => {
  const query = req.query;
  res.json({
    msg: 'get API - Desde controlador',
    query
  })
}

const usersPut = (req, res = response) => {
  const {id} = req.params;
  res.json({
    msg: 'Put API - Desde controlador',
    id
  })
}

const usersPost = async (req, res = response) => {
  const {nombre, correo, password, rol} = req.body;
  const usuario = new Usuario({nombre, correo, password, rol});
  // Verificar si el correo existe
  const emailExist = await Usuario.findOne({correo:correo})
  if (emailExist) {
    return res.status(400).json({
      msg: 'El corro ya se encuentra registrado'
    })
  }

  // Encriptar la contraseña
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync( password, salt );

  //await usuario.save();


  res.json({
    msg: 'Post API - Desde controlador',
    body
  });
}

const usersDelete = (req, res = response) => {
  res.json({
    msg: 'Delete API - Desde controlador'
  })
}


module.exports = {
  usersGet,
  usersPut,
  usersPost,
  usersDelete
}
