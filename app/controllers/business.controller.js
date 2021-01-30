
const db = require('../config/db.config.js');
const jwt = require('jsonwebtoken');
const chalk = require('chalk');

const log = console.log;

const Business = db.Business;

const generateAuthToken=async function(user){
    
    const token = jwt.sign({ email: user.email }, 'juanchoNoSabeNode')

    
    console.log("THIS IS THE TOKEN",token);
    return token
}

const findByCredentials=async function(req){
    
    // log(chalk.bgBlue(req))

    try{
        let business= await Business.findAll(
            {
                where:{
                    password:req.body.password,
                    email:req.body.email
                }
            }
        );

        
    
        return business;
    }
    catch(e){
        return 
    }

    
    
}



exports.create = async (req, res) => {
    let business = {};

    try{
        // Building Client object from upoading request's body
        business.email = req.body.email;
        business.name = req.body.name;
        business.companyName = req.body.companyName;
        
        business.password = req.body.password;
        business.phone=req.body.phone;
        business.companyPhone=req.body.companyPhone;

        const token= await generateAuthToken(business);
        business.tokens= [token];

        businessCreated= await Business.create(business);
        log(chalk.bold.black.bgGreen("SE CREO EL EMPRESARIO DE MANERA EXITOSA"));
        res.status(200).json({
            message: "Register Successfully the BUSINESS ",
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
        log(chalk.bold.bgRed("NO SE PUDO CREAR EL EMPRESARIO"));
    }
}




exports.login = async (req, res) => {
    

    try{
        let business= await findByCredentials(req);
        
        
        if(!business){
            log(chalk.bold.bgRed("FALLO EL INTENTO DE LOGIN DEL EMPRESARIO"));
            res.status(400).json({
                error: "FALLO CON LA AUTENTICACION",
            });
        }
        else if(!business[0].dataValues.verified){
            res.status(400).json({
                error: "NO HA SIDO VERIFICADO CORRECTAMENTE",
            });
            return 
        }
        else{
            log(chalk.bold.black.bgYellow("SE HIZO LOGIN POR PARTE DEL ADMIN",business[0].dataValues.email));
            res.status(200).json({
                token:business[0].dataValues.tokens[0]
            });
        }
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
        log(chalk.bold.bgRed("NO SE PUDO REALIZAR EL LOGIN EMPRESARIO SOLCITADO"));
    }
}

exports.getUnverified = async (req, res) => {
    

    try{
        let business= await Business.findAll({where:{verified:false}});
        res.status(200).json(business);
        
        
        
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
        log(chalk.bold.bgRed("NO SE PUDO  BRINDAS TOAS LAS EMPRESAS SIN VERIFICAR"));
    }
}


exports.updateById = async (req, res) => {
    try{
        let businessId = req.params.id;
        let business = await Business.findByPk(businessId);
    
        if(!business){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a Business with id = " + businessId,
                error: "404"
            });
        } else {
            let result = await Business.update(req.body, {returning: true, where: {id: businessId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a BUSINESS with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a BUSINESS with id = " + req.params.id,
                business: result,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a BUSINESS with id = " + req.params.id,
            error: error.message
        });
    }
}




// exports.getById = async (req, res) => {
//     try{
//         let businessId = req.params.id;
//         let business = await Business.findByPk(businessId);

    
//         if(!business){
//             // return a response to client
//             res.status(404).json({
//                 message: "Not Found  a Business with id = " + businessId,
//                 error: "404"
//             });
//         } else {
//             res.status(200).json({
//                 message: "THIS IS  successfully a BUSINESS with id = " + req.params.id,
//                 business: result,
//             });
//         }
//     } catch(error){
//         res.status(500).json({
//             message: "Error -> Can not update a BUSINESS with id = " + req.params.id,
//             error: error.message
//         });
//     }
// }






// exports.retrieveAllClients = (req, res) => {
//     // find all Customer information from 
//     Client.findAll()
//         .then(customerInfos => {
//             res.status(200).json({
//                 message: "Get all Clients' Infos Successfully!",
//                 clients: customerInfos
//             });
//         })
//         . catch(error => {
//           // log on console
//           console.log(error);

//           res.status(500).json({
//               message: "Error!",
//               error: error
//           });
//         });
// }

// exports.getMe = (req, res) => {
//   // find all Customer information from 
//   res.status(200).json( req.user);
  
  
// }


// exports.updateById = async (req, res) => {
//     try{
//          let userId = req.user.email;
//         let user = await User.findOne({ where: { email: req.user.email } });
//         if(!user){
//             // return a response to client
//             res.status(404).json({
//                 message: "Not Found for updating a USER with id = " + userId,
//                 user: "",
//                 error: "404"
//             });
//         } else {    
           
//             let result = await User.update(req.body, {returning: true, where: {email: userId}});
            
//             // return the response to client
//             if(!result) {
//                 res.status(500).json({
//                     message: "Error -> Can not update a USER with id = " + req.params.id,
//                     error: "Can NOT Updated",
//                 });
//             }

//             res.status(200).json({
//                 message: "Update successfully a USER with id = " + req.params.id,
//                 user: result,
//             });
//         }
//     } catch(error){
//         res.status(500).json({
//             message: "Error -> Can not update a USER with id = " + req.params.id,
//             error: error.message
//         });
//     }
// }