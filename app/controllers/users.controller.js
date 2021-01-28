
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
                // user: userCreated,
                // token:token
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

exports.getClientById = (req, res) => {
  // find all Customer information from 
  let customerId = req.params.id;
  
  Client.findByPk(customerId)
      .then(customer => {
          res.status(200).json({
              message: " Successfully Get a Customer with id = " + customerId,
              clients: customer
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


// exports.filteringByAge = (req, res) => {
//   let age = req.query.age;

//     Customer.findAll({
//                       attributes: ['id', 'firstname', 'lastname', 'age', 'address', 'copyrightby'],
//                       where: {age: age}
//                     })
//           .then(results => {
//             res.status(200).json({
//                 message: "Get all Customers with age = " + age,
//                 customers: results,
//             });
//           })
//           . catch(error => {
//               console.log(error);
//               res.status(500).json({
//                 message: "Error!",
//                 error: error
//               });
//             });
// }
 
// exports.pagination = (req, res) => {
//   try{
//     let page = parseInt(req.query.page);
//     let limit = parseInt(req.query.limit);
  
//     const offset = page ? page * limit : 0;
  
//     Customer.findAndCountAll({ limit: limit, offset:offset })
//       .then(data => {
//         const totalPages = Math.ceil(data.count / limit);
//         const response = {
//           message: "Paginating is completed! Query parameters: page = " + page + ", limit = " + limit,
//           data: {
//               "copyrightby": "https://loizenai.com",
//               "totalItems": data.count,
//               "totalPages": totalPages,
//               "limit": limit,
//               "currentPageNumber": page + 1,
//               "currentPageSize": data.rows.length,
//               "customers": data.rows
//           }
//         };
//         res.send(response);
//       });  
//   }catch(error) {
//     res.status(500).send({
//       message: "Error -> Can NOT complete a paging request!",
//       error: error.message,
//     });
//   }    
// }

// exports.pagingfilteringsorting = (req, res) => {
//   try{
//     let page = parseInt(req.query.page);
//     let limit = parseInt(req.query.limit);
//     let age = parseInt(req.query.age);
  
//     const offset = page ? page * limit : 0;

//     console.log("offset = " + offset);
  
//     Customer.findAndCountAll({
//                                 attributes: ['id', 'firstname', 'lastname', 'age', 'address'],
//                                 where: {age: age}, 
//                                 order: [
//                                   ['firstname', 'ASC'],
//                                   ['lastname', 'DESC']
//                                 ],
//                                 limit: limit, 
//                                 offset:offset 
//                               })
//       .then(data => {
//         const totalPages = Math.ceil(data.count / limit);
//         const response = {
//           message: "Pagination Filtering Sorting request is completed! Query parameters: page = " + page + ", limit = " + limit + ", age = " + age,
//           data: {
//               "copyrightby": "https://loizenai.com",
//               "totalItems": data.count,
//               "totalPages": totalPages,
//               "limit": limit,
//               "age-filtering": age,
//               "currentPageNumber": page + 1,
//               "currentPageSize": data.rows.length,
//               "customers": data.rows
//           }
//         };
//         res.send(response);
//       });  
//   }catch(error) {
//     res.status(500).send({
//       message: "Error -> Can NOT complete a paging request!",
//       error: error.message,
//     });
//   }      
// }

// exports.updateById = async (req, res) => {
//     try{
//         let customerId = req.params.id;
//         let customer = await Customer.findByPk(customerId);
    
//         if(!customer){
//             // return a response to client
//             res.status(404).json({
//                 message: "Not Found for updating a customer with id = " + customerId,
//                 customer: "",
//                 error: "404"
//             });
//         } else {    
//             // update new change to database
//             let updatedObject = {
//                 firstname: req.body.firstname,
//                 lastname: req.body.lastname,
//                 address: req.body.address,
//                 age: req.body.age
//             }
//             let result = await Customer.update(updatedObject, {returning: true, where: {id: customerId}});
            
//             // return the response to client
//             if(!result) {
//                 res.status(500).json({
//                     message: "Error -> Can not update a customer with id = " + req.params.id,
//                     error: "Can NOT Updated",
//                 });
//             }

//             res.status(200).json({
//                 message: "Update successfully a Customer with id = " + customerId,
//                 customer: updatedObject,
//             });
//         }
//     } catch(error){
//         res.status(500).json({
//             message: "Error -> Can not update a customer with id = " + req.params.id,
//             error: error.message
//         });
//     }
// }

// exports.deleteById = async (req, res) => {
//     try{
//         let customerId = req.params.id;
//         let customer = await Customer.findByPk(customerId);

//         if(!customer){
//             res.status(404).json({
//                 message: "Does Not exist a Customer with id = " + customerId,
//                 error: "404",
//             });
//         } else {
//             await customer.destroy();
//             res.status(200).json({
//                 message: "Delete Successfully a Customer with id = " + customerId,
//                 customer: customer,
//             });
//         }
//     } catch(error) {
//         res.status(500).json({
//             message: "Error -> Can NOT delete a customer with id = " + req.params.id,
//             error: error.message,
//         });
//     }
// }