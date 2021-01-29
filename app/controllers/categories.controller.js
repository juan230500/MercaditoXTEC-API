
const db = require('../config/db.config.js');
const jwt = require('jsonwebtoken');
const chalk = require('chalk');

const log = console.log;

const Category = db.Category;

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
    let category = {};

    try{
        // Building Client object from upoading request's body
        category.label = req.body.label;
        category.value = req.body.value;
       
        categoryCreated= await Category.create(category);
        log(chalk.bold.black.bgGreen("SE CREO LA CATEGORIA DE MANERA EXITOSA"));
        res.status(200).json({
            message: "CATEGORY CREATED",
            category: categoryCreated,

        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
        log(chalk.bold.bgRed("NO SE PUDO CREAR LA CATEGORIA"));
        console.log("ERROR",error)
    }
}







exports.retrieveAllCategories = async (req, res) => {
    // find all Customer information from 

    try{
        categories= await Category.findAll();
        res.status(200).json({
            message: "THIS ARE THE CATEGORIES",
            categories: categories
        });

    }
    catch(e){
        res.status(500).json({
            Error: "THERE WAS A ERROR CREATING A CATEGORY"
        });
        log(chalk.bold.bgRed("NO SE PUDO BRINDAR TODAS LAS  CATEGORIAS"));
        console.log("ERROR",e);

    }
   
       
}

// exports.getClientById = (req, res) => {
//   // find all Customer information from 
//   let customerId = req.params.id;
  
//   Client.findByPk(customerId)
//       .then(customer => {
//           res.status(200).json({
//               message: " Successfully Get a Customer with id = " + customerId,
//               clients: customer
//           });
//       })
//       . catch(error => {
//         // log on console
//         console.log(error);

//         res.status(500).json({
//             message: "Error!",
//             error: error
//         });
//       });
// }


