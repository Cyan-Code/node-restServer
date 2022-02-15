const { response } = require('express');

const getCategories = (req, res = response) => {
  const body = req.body
  res.jsonp({ estado: true, body})
}

module.exports = getCategories