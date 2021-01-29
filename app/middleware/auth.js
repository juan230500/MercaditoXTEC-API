const jwt = require('jsonwebtoken');
const { User } = require('../config/db.config');
const db = require('../config/db.config');

const chalk = require('chalk');


const Product = db.Product;

const Client=db.Client;



const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'juanchoNoSabeNode')
        // console.log("ESTE ES EL EMAIL DEL TOKEN",decoded);
        let user= await User.findByPk(decoded.email);
        // let user2= await User.findOne({
        //     where: {
        //         email: decoded.email
        //       },
        //       include: 
        //         { model: Product },
                
        // })
        // Y asi es como se parse para obtner la info
        // console.log("PRODUCTOS",user)
        // console.log("ESTE ES EL CLIENTE",user2);
        req.user = user
        req.token = token
        next()
    } catch (e) {
        console.log("ERROR EN AUTH",e)
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth