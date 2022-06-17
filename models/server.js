const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.paths = {
      authPath: '/api/auth',
      searchPath: '/api/busqueda',
      categoryPath: '/api/categories',
      productosPath: '/api/product',
      usersPath: '/api/users',
    }
    this.app = express();
    this.port = process.env.PORT;

    // Conectar a base de datos
    this.conectarDB();

    // Middelwares
    this.middlewares();
    // Rutas de mi App
    this.routes();
    
  }

  async conectarDB () {
    await dbConnection();
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
    this.app.use(this.paths.authPath, require('../routes/auth'));
    this.app.use(this.paths.categoryPath, require('../routes/categories'));
    this.app.use(this.paths.productosPath, require('../routes/productos'));
    this.app.use(this.paths.searchPath, require('../routes/busquedas'))
    this.app.use(this.paths.usersPath, require('../routes/user'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en el puerto', this.port)
    });
  }
}

module.exports = Server;