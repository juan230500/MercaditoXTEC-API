
const db = require('../config/db.config.js');
const jwt = require('jsonwebtoken');
const chalk = require('chalk');

const log = console.log;

const Order = db.Order;
const Chat = db.Chat;
const Message = db.Message;





exports.create = async (req, res) => {
    let order = {};
    let chat = {};

    try{
        // Building Client object from upoading request's body
        order.itemId = req.body.itemId;
        order.type = req.body.type;
        order.date = req.body.date;
        order.status=req.body.status;
        order.client= req.user.email;
        order.seller=req.body.seller;
        orderCreated= await Order.create(order);
        // AQUI CREAMOS EL CHAT PARA ESTA ORDEN
        chat.itemId = req.body.itemId;
        chat.type = req.body.type;
        chat.client= req.user.email;
        chat.seller=req.body.seller;
        chat.orderId=orderCreated.dataValues.id;
        chatCreated= await Chat.create(chat);
        log(chalk.bold.black.bgGreen("SE CREO LA ORDER CORRECTAMENTE  Y EL CHAT ENTRE, VENDEDOR:"+order.seller+"COMPRADOR: "+order.client));
        res.status(200).json({
            message: "SE CREO CORRECTAMENTE LA ORDEN Y EL CHAT",
            order: orderCreated.dataValues,
            chat:chatCreated.dataValues

        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
        log(chalk.bold.bgRed("NO SE PUDO CREAR LA ORDEN NI EL CHAT"));
        console.log("ERROR",error)
    }
}




exports.getStock = async (req, res) => {
  // find all Customer information from 
  
  try{
      const user=req.user
    let productId = req.params.id;
      const stock= await Order.findAll({ where: { seller: user.email } });
      log(chalk.bold.black.bgGreen("SE LISTO CORRECTAMENTE EL STOCK DE:"+user.email));
      res.status(200).json(stock);
  }catch(e){
    res.status(500).json({error:e});
  }
}




exports.getPurchases = async (req, res) => {
    // find all Customer information from 
    
    try{
        const user=req.user
        const stock= await Order.findAll({ where: { client: user.email } });
        log(chalk.bold.black.bgGreen("SE LISTO CORRECTAMENTE LAS COMPRAS DE:"+user.email));
        res.status(200).json(stock);
    }catch(e){
      res.status(500).json({error:e});
    }
  }


exports.getMessages = async (req, res) => {
    // find all Customer information from 
    
    try{
        const user=req.user
        let orderId = req.params.id;
        const chat=await Chat.findOne({where: { orderId: orderId }})
        const messages=await Message.findAll({where: { chatId: chat.id }})
        log(chalk.bold.black.bgGreen("SE LISTO CORRECTAMENTE LOS MENSAJES DE LA ORDEN:"+orderId));
        res.status(200).json(messages);
    }catch(e){
      res.status(500).json({error:e});
    }
  }


exports.updateById = async (req, res) => {
    try{
        let orderId = req.params.id;
        let order = await Order.findByPk(orderId);
    
        if(!order){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a Order with id = " + orderId,
                error: "404"
            });
        } else {    
          
            let result = await Order.update(req.body, {returning: true, where: {id: orderId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update the order with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully the order with id = " + orderId,
                order: order,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a Order with id = " + req.params.id,
            error: error.message
        });
    }
}
