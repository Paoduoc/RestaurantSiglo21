const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
//const { generarJWT, googleVerify, generatePassword } = require('../../helpers/auth');
const jwt = require("jsonwebtoken");
const userModel = require("../Model/usuario");

class User
{
    
    getUsuario = async ( res, req ) => {

        try {
        } catch (error) {
            
        }

    }
    getAllUsuario = async ( req=request, res=response ) => {
        
        try {

            const usuario = await userModel.find();
            res.status(200).json({
                status:200,
                msg:usuario
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:500,
                msg:'Internal Server Error',
                descripcion:'Ha ocurrido un error en el servidor, no se encontraron usuarios'
            }); 
        }

    }
    postUsuario = async ( res, req ) => {
        
        try {
            
        } catch (error) {
            
        }

    }
    putUsuario = async ( res, req ) => {
        
        try {
            
        } catch (error) {
            
        }

    }
    deleteUsuario = async ( res, req ) => {
        
        try {
            
        } catch (error) {
            
        }

    }

}

module.exports = User;