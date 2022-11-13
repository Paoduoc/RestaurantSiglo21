const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const dbConnection = require('../Database/config');
//const fileUpload = require('express-fileupload');
const https = require('https');
const fs = require('fs');
const hbs = require('hbs')

class Server {

    constructor( path ) {
        /* this.init = init; */
        this.app = express();//LEVANTA EL SERVIDOR
        this.port = process.env.PORT;//SE SETEA EL PUERTO
        this.path = path;
        //Conexion BBDD
        this.connectDB();//ejecuta la funcion de conectar a la bd
        //Middlewares
        this.hbs = hbs;
        this.middlewares();
        //Rutas Servidor
        this.route = require('../Route/routes.json');
        this.routes();
        
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        //CONFIGURACIONES DEL SERVIDOR
        this.app.set('view engine', 'hbs');
        this.hbs.registerPartials(this.path + '/views/partials');
        this.app.use(cookieParser());
        
        this.app.use(cors());

        //SETEA COSAS DE JSON
        this.app.use( express.json() );
        this.app.use( bodyParser.urlencoded({ extended: true }) );
        this.app.use( bodyParser.json() );
        //this.app.use(fileUpload());
        this.app.use(express.static('public'));
           
    }

    routes() {

        if (process.env.NODE_ENV_PROD  == 'true') {
            this.app.use((req, res, next) => {
                console.log(`https://${req.headers.host}${req.url}`);
                if (req.secure) next(); else res.redirect(`https://${req.headers.host}${req.url}`);
            });
        }
        //Aquí se añaden los endpoints api
        this.app.use(this.route.routes.api.v1.auth, require('../Route/auth')); 
        this.app.use(this.route.routes.api.v1.user, require('../Route/user')); 
        this.app.use(this.route.routes.api.v1.main, require('../Route/main')); 
        this.app.use(this.route.routes.api.v1.roles, require('../Route/rol'));
        this.app.use(this.route.routes.api.v1.accesos, require('../Route/acceso'));
        this.app.use(this.route.routes.api.v1.accesoRol, require('../Route/accesoRol'));
        this.app.use(this.route.routes.api.v1.mesa, require('../Route/mesa'));
        this.app.use(this.route.routes.api.v1.producto, require('../Route/producto'));
        this.app.use(this.route.routes.api.v1.bodega, require('../Route/bodega'));
        this.app.use(this.route.routes.api.v1.plato, require('../Route/plato'));
        this.app.use(this.route.routes.api.v1.reservas, require('../Route/reserva'));
        this.app.use(this.route.routes.api.v1.menu, require('../Route/menu'));
        this.app.use(this.route.routes.api.v1.pedido, require('../Route/pedido'));
        this.app.use(this.route.routes.api.v1.proveedor, require('../Route/provedor'));
        this.app.use(this.route.routes.api.v1.comanda, require('../Route/comanda'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en ambiente ${process.env.NODE_ENV} en el puerto ${this.port}`);
        })
    }
}

module.exports = Server;