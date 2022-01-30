const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJwt } = require('../helpers/generarJWT');

const { googleVerify } = require('../helpers/google-sing');


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

  try {
    const { nombre, correo, img } = await googleVerify(id_token);
    
    let usuario = await Usuario.findOne({correo});
    if (!usuario) {
      const data = { 
        nombre,
        correo,
        password: '.',
        img,
        google: true,
        rol: 'USER_ROL'
      }
      usuario = new Usuario(data);
      await usuario.save();
    }

    if (!usuario.estado) {
      return res.status(401).json({
        ok: 'false',
        msg: 'Hable con el administrador, Usuario bloqueado'
      })
    }

    //Generar JWT
    const token = await generarJwt(usuario.id);

    res.json({
      msg:'Todo Ok',
      usuario, token
    })
    
  } catch (error) {
    return res.status(400).json({
      ok: 'false',
      msg: 'El Token no se pudo verificar'
    })
  }
}



module.exports = {
  login,
  googleSingIn
}
