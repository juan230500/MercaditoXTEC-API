const jwt = require('jsonwebtoken');
const db = require('../config/db.config');

const Client=db.Client;
0


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'juanchoNoSabeNode')
        console.log("ESTE ES EL EMAIL DEL TOKEN",decoded);
        let user= await Client.findByPk(decoded.email);
        console.log("ESTE ES EL CLIENTE",cliente.dataValues);
        req.user = user
        req.token = token
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth