require('dotenv').config();
const { dbConnection } = require('./config/connection');
const Server = require('./models/server');

const server = new Server();

//Conexion a la base de datos
dbConnection();

server.listen();