const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload'); //importacion

class Server {
  constructor() {
    this.paths = {
      authPath:      '/api/auth',
      searchPath:    '/api/busqueda',
      categoryPath:  '/api/categories',
      productosPath: '/api/product',
      usersPath:     '/api/users',
      uploadsPath:   '/api/uploads'
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

    // For File Uploads
    this.app.use( fileUpload ({ useTempFiles : true, tempFileDir : '/tmp/' }));//Uso como middleware a nivel del servidor, para poder aceptar archivos por peticiones
  }

  routes() {
    this.app.use(this.paths.authPath,      require('../routes/auth'));
    this.app.use(this.paths.categoryPath,  require('../routes/categories'));
    this.app.use(this.paths.productosPath, require('../routes/productos'));
    this.app.use(this.paths.searchPath,    require('../routes/busquedas'))
    this.app.use(this.paths.usersPath,     require('../routes/user'));
    this.app.use(this.paths.uploadsPath,   require('../routes/uploads'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en el puerto', this.port)
    });
  }
}

module.exports = Server;