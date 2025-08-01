const express = require('express');
const cors = require('cors');
class Server {
    constructor() {
        //Express
        this.app = express();

        //Puerto
        this.port=process.env.PORT;

        //Paths
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middlewares();

        //Ruotes
        this.routes();
    }
    middlewares() {
        //CORS
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json());

    //Mostrar carpeta publica
    this.app.use(express.static('public')); 
    };
    routes() {
       this.app.use(this.usuariosPath, require('../Routes/Usuarios'));
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    } 
   
}

module.exports = Server;