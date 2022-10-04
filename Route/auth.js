const { Router, response } = require('express');
const { check } = require('express-validator');
const router = Router();

const Auth = require('../Controller/auth');
const auth = new Auth();

router.post('/login',( req , res ) =>{ auth.login( req, res ) });

module.exports = router;                               