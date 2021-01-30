
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
        console.log("SERVICIO",serviceCreated)
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


exports.getServiceById = async (req, res) => {
    // find all Customer information from 
    
    try{
      let serviceId = req.params.id;
        const service= await Service.findByPk(serviceId);
        console.log("EST ES EL SERVICIO",service)
        res.status(200).json(service);
    }catch(e){
      res.status(500).json({error:e});
    }
  }



exports.updateById = async (req, res) => {
    try{
        let serviceId = req.params.id;
        let service = await Service.findByPk(serviceId);
    
        if(!service){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a Service with id = " + serviceId,
                service: "",
                error: "404"
            });
        } else {    
           
            let result = await Service.update(req.body, {returning: true, where: {id: serviceId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a SERVICE with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a SERVICE with id = " + req.params.id,
                service: result,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a SERVICE with id = " + req.params.id,
            error: error.message
        });
    }
}


