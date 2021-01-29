
const db = require('../config/db.config.js');
const jwt = require('jsonwebtoken');
const chalk = require('chalk');

const log = console.log;

const User = db.User;

const generateAuthToken=async function(user){
    
    const token = jwt.sign({ email: user.email }, 'juanchoNoSabeNode')

    
    console.log("THIS IS THE TOKEN",token);
    return token
}

const findByCredentials=async function(req){
    
    // log(chalk.bgBlue(req))

    try{
        let user= await User.findAll(
            {
                where:{
                    password:req.body.password,
                    email:req.body.email
                }
            }
        );

        
    
        return user;
    }
    catch(e){
        return 
    }

    
    
}



exports.create = async (req, res) => {
    let user = {};

    try{
        // Building Client object from upoading request's body
        user.address = req.body.address;
        user.email = req.body.email;
        user.name = req.body.name;
        user.password = req.body.password;
        user.phone=req.body.phone;
        const token= await generateAuthToken(user);
        user.tokens= [token];

        userCreated= await User.create(user);
        log(chalk.bold.black.bgGreen("SE CREO EL USUARIO DE MANERA EXITOSA"));
        res.status(200).json({
            message: "Upload Successfully a Client with id = ",
            user: userCreated,
            token:token
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
        log(chalk.bold.bgRed("NO SE PUDO CREAR EL USUARIO"));
    }
}




exports.login = async (req, res) => {
    

    try{
        let user= await findByCredentials(req);
        
        if(!user){
            log(chalk.bold.bgRed("FALLO EL INTENTO DE LOGIN"));
            res.status(400).json({
                error: "FALLO CON LA AUTENTICACION",
            });
        }
        else{
            log(chalk.bold.black.bgYellow("SE HIZO LOGIN POR PARTE DEL USUARIO",user[0].dataValues.email));
            res.status(200).json({
                token:user[0].dataValues.tokens[0]
            });
        }
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
        log(chalk.bold.bgRed("NO SE PUDO REALIZAR EL LOGIN SOLCITADO"));
    }
}




exports.retrieveAllClients = (req, res) => {
    // find all Customer information from 
    Client.findAll()
        .then(customerInfos => {
            res.status(200).json({
                message: "Get all Clients' Infos Successfully!",
                clients: customerInfos
            });
        })
        . catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
}

exports.getMe = (req, res) => {
  // find all Customer information from 
  res.status(200).json( req.user);
  
  
}


exports.updateById = async (req, res) => {
    try{
         let userId = req.user.email;
        let user = await User.findOne({ where: { email: req.user.email } });
        if(!user){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a USER with id = " + userId,
                user: "",
                error: "404"
            });
        } else {    
           
            let result = await User.update(req.body, {returning: true, where: {email: userId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a USER with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a USER with id = " + req.params.id,
                user: result,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a USER with id = " + req.params.id,
            error: error.message
        });
    }
}