const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

class Main{
    

    index = async (  req, res ) => {

        try {

            res.render("../View/partials/index", {
                nombre:"paola"
            })

        } catch (error) {
            
            console.log(error);

        }
    }



}

module.exports = Main;