
const db = require('../config/db.config.js');
const jwt = require('jsonwebtoken');
const chalk = require('chalk');

const log = console.log;
const Service = db.Service;


exports.create = async (req, res) => {
    let service = {};

    try{
        // Building Client object from upoading request's body
        service.name = req.body.name;
        service.price = req.body.price;
        service.paymentInfo = req.body.paymentInfo;
        service.deliveryInfo=req.body.deliveryInfo;
        service.userEmail= req.user.email;
        service.description=req.bodydescription;
        serviceCreated= await Service.create(service);
        log(chalk.bold.black.bgGreen("SE CREO EL SERVICIO DE MANERA EXITOSA"));
        res.status(200).json({
            message: "THIS IS THE SERVICE CREATED",
            service: serviceCreated,

        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
        log(chalk.bold.bgRed("NO SE PUDO CREAR EL SERVICIO"));
        console.log("ERROR",error)
    }
}







exports.retrieveAllServices =  async (req, res) => {
    // find all Customer information from 
    try{
        let services=  await Service.findAll();
        res.status(200).json({
            message: "THIS ARE ALL THE SERVICES",
            services: services
        });
    }
    catch(e){
        log(chalk.bold.bgRed("NO SE PUDO OBTENER TODOS LOS SERVICIOS"));
        console.log("ERROR",error)
          res.status(500).json({
              message: "Error!",
              error: error
          });
    }
}

