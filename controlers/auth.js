const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJwt } = require('../helpers/generarJWT');


const login = async (req, res = response) => {

  const { correo, password } = req.body;

  try { 
    //Verificar si Email Existe
    const usuario = await Usuario.findOne({correo});
    if(!usuario){
      return res.status(400).json({
        msg: 'Usuario / password no son correctas'
      })
    }

    // Verificar si el user esta activo (existe)
    if(!usuario.estado){
      return res.status(400).json({
        msg: 'El usuario no esta activo'
      })
    }

    // Verificar contraseña
    const validPassword = bcryptjs.compareSync( password, usuario.password );
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / password no son correctas'
      })
    }
    //Generar JWT
    const token = await generarJwt(usuario.id);

    res.json({
      msg: 'Login OK',
      usuario, token
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Hable con el administrador'
    });
  }
}

const googleSingIn = async(req, res = response) => {

  const { id_token } = req.body;

  res.json({
    msg:'Todo Ok',
    id_token
  })
}



module.exports = {
  login,
  googleSingIn
}
