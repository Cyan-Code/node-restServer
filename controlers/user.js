const {response} = require('express');

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

const usersPost = (req, res = response) => {
  const body = req.body;

  res.json({
    msg: 'Post API - Desde controlador',
    body
  })
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
