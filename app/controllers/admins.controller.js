
const db = require('../config/db.config.js');
const jwt = require('jsonwebtoken');
const chalk = require('chalk');

const log = console.log;

const Admin = db.Admin;

const generateAuthToken=async function(user){
    
    const token = jwt.sign({ email: user.email }, 'juanchoNoSabeNode')

    
    console.log("THIS IS THE TOKEN",token);
    return token
}

const findByCredentials=async function(req){
    
    // log(chalk.bgBlue(req))

    try{
        let admin= await Admin.findAll(
            {
                where:{
                    password:req.body.password,
                    email:req.body.email
                }
            }
        );

        
    
        return admin;
    }
    catch(e){
        return 
    }

    
    
}



exports.create = async (req, res) => {
    let admin = {};

    try{
        // Building Client object from upoading request's body
        admin.address = req.body.address;
        admin.email = req.body.email;
        admin.name = req.body.name;
        admin.password = req.body.password;
        admin.phone=req.body.phone;
        const token= await generateAuthToken(admin);
        admin.tokens= [token];

        adminCreated= await Admin.create(admin);
        log(chalk.bold.black.bgGreen("SE CREO EL ADMIN DE MANERA EXITOSA"));
        res.status(200).json({
            message: "Upload Successfully the Admin with id = ",
            Admin: adminCreated,
            token:token
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
        log(chalk.bold.bgRed("NO SE PUDO CREAR EL ADMIN"));
    }
}




exports.login = async (req, res) => {
    

    try{
        let admin= await findByCredentials(req);
        
        if(!admin){
            log(chalk.bold.bgRed("FALLO EL INTENTO DE LOGIN DEL ADMIN"));
            res.status(400).json({
                error: "FALLO CON LA AUTENTICACION",
            });
        }
        else{
            log(chalk.bold.black.bgYellow("SE HIZO LOGIN POR PARTE DEL ADMIN",admin[0].dataValues.email));
            res.status(200).json({
                token:admin[0].dataValues.tokens[0]
            });
        }
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
        log(chalk.bold.bgRed("NO SE PUDO REALIZAR EL LOGIN ADMIN SOLCITADO"));
    }
}




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