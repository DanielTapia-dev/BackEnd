const express = require('express');
const cors = require('cors')
const app = express();

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';


        //Middlewares
        this.middlewares();
        //Rutas de la aplicacion

        this.routes();
    }

    middlewares() {

        //CORS AQUI SE CONFIGURAN LOS DOMINIOS DE WHITELIST
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/users'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server start in port ' + this.port)
        });
    }
}

module.exports = Server;