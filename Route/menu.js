const { Router, response } = require('express');
const router = Router();
const Menu = require('../Controller/menu');
const menu = new Menu();

router.get('/',( req , res ) =>{ menu.getMenu( req, res ) });

module.exports = router;