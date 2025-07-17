const express = require('express');

class Server {
    constructor() {
        //Express
        this.app = express();

        //Paths
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middlewares();

        //Ruotes
        this.routes();
    }
    middlewares() {
        this.app.use(express.json());

    //Mostrar carpeta publica
    this.app.use(express.static('public')); 
    };
    routes() {
       this.app.use(this.usuariosPath, require('../Routes/Usuarios'));
    };

    listen() {
        this.app.listen(3000, () => {
            console.log('Server running on port', 3000);
        });
    } 
   
}

module.exports = Server;