require('dotenv').config();
const Server = require('./Model/server');

const server = new Server(__dirname);
server.listen();//donde escucha el servidor
