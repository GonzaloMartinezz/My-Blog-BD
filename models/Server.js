const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {
    constructor() {
        //Express
        this.app = express();

        //Puerto
        this.port = process.env.PORT;

        //Paths

        //Usuarios
        this.usuariosPath = '/api/usuarios';

        //login
        this.authPath = '/api/auth';

        //Categorias
        this.categoriasPath = '/api/categorias';
        
        //Conectar a base de datos
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Ruotes
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }
    middlewares() {
        //CORS
        this.app.use(cors());

        this.app.use(express.json());
        //Lectura y parseo del body
        this.app.use(express.json());

        //Mostrar carpeta publica
        this.app.use(express.static('public'));
    };
    routes() {
        this.app.use(this.usuariosPath, require('../Routes/Usuarios'));
        this.app.use(this.authPath, require('../Routes/auth'));
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    }

}

module.exports = Server;