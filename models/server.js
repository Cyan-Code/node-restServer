const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.usersPath = '/api/users'

    this.app = express();
    this.port = process.env.PORT;
    // Middelwares
    this.middlewares();
    // Rutas de mi App
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use( cors() );

    // Lectura y parseo del body
    this.app.use( express.json() );

    // Directorio Publico
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/user'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en el puerto', this.port)
    });
  }
}

module.exports = Server;