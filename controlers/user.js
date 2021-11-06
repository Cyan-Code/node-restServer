const {response} = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

const usersGet = async (req, res = response) => {
  const {limit = 5, desde = 0} = req.query;

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true}),
    Usuario.find({ estado: true})
      .skip(Number(desde))
      .limit(parseInt(limit))
  ])

  return res.json({
    total, usuarios
  })
}

const usersPut = async (req, res = response) => {
  const {id} = req.params;
  const { _id, password, google, ...rest } = req.body;

  // TODO validar contra base de datos
  if( password ) {
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync( password, salt );
  }

  const usuario = await Usuario.findByIdAndUpdate( id, rest )

  return res.json({usuario})
}

const usersPost = async (req, res = response) => {
  const {nombre, correo, password, rol} = req.body;
  const usuario = new Usuario({nombre, correo, password, rol});

  // Encriptar la contraseña
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync( password, salt );

  await usuario.save();


  res.json({
    msg: 'Post API - Desde controlador',
    nombre, correo, rol
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
