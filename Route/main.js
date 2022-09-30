const { Router, response } = require('express');
const { check } = require('express-validator');
const router = Router();
const Main = require('../Controller/main');
const main = new Main();

router.get('/',( req , res ) =>{ main.index( req, res ) });


module.exports = router;