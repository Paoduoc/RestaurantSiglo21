const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

class Main{
    
    //codigo de prueba
    index = async (  req=request, res=response ) => {

        try {
            let data1
            var axios = require('axios');
            var data = JSON.stringify({
            "token": req.body.token
            });

            var config = {
            method: 'get',
            url: 'http://localhost:8080/api/v1/flow/estatus/',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
            };

            await axios(config)
            .then(function (response) {
                data1=response.data
            console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
            console.log(error);
            });

            res.render("../View/partials/index", {
                nombre:"paola",
                data:JSON.stringify(data1)
                
            })

        } catch (error) {
            
            console.log(error);
            
        }
    }



}

module.exports = Main;