var stream = require('stream');
const db = require('../config/db.config.js');
const chalk = require('chalk');
const jwt = require('jsonwebtoken');

const log = console.log;

const Practice = db.Practice;
const User = db.User;
const Service=db.Service;
const Product=db.Product;
const Tutorial=db.Tutorial;


const auth = async (req) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'juanchoNoSabeNode')
        let user = await User.findByPk(decoded.email);
        return user;

    } catch (e) {
        console.log("ERROR EN AUTH", e)

        return
    }
}


exports.create = async (req, res) => {
    try {
        let user = await auth(req);
        // if()
        console.log("ESTE ES EL REQUEST", req.body.tutor)
        console.log("TYPE", typeof (req.tutor))
        let practiceCreated = await Practice.create({
            type: req.file.mimetype,
            name: req.file.originalname,
            data: req.file.buffer,
            curse: req.body.curse,
            paymentInfo: req.body.paymentInfo,
            price: req.body.price,
            topics: req.body.topics,
            userEmail: user.email
        });
        log(chalk.bold.black.bgGreen("SE CREO LA PRACTICA DE MANERA EXITOSA"));
        res.status(200).json({
            message: "SE CREO LA PRACTICA DE MANERA EXITOSA",
            Practice: req.file.originalname,
            downloadUrl: "/file/" + practiceCreated.dataValues.id,

        });
    } catch (e) {

        res.status(500).json({
            message: "Fail!",
            error: e.message
        });
        log(chalk.bold.bgRed("NO SE PUDO CREAR LA PRACTICA"));
        console.log("ERROR", e)

    }

}



exports.listAllMarket = async (req, res) => {
    try {
        const files = await Practice.findAll({
            attributes: ['id', 'name','curse','price','topics']
        });
        const services = await Service.findAll({});
        const products=await Product.findAll({});
        const tutorials= await Tutorial.findAll({});
        const fileInfo = [];
        const servicesInfo = [];
        const productsInfo = [];
        const tutorialsInfo=[];


        for (let i = 0; i < files.length; i++) {
            fileInfo.push({
                id:files[i].id,
                name: files[i].name,
                curse: files[i].curse,
                price:files[i].price,
                topics:files[i].topics,
                eval:files[i].eval,
                type:"practice"
            })
        }
        for (let i = 0; i < services.length; i++) {
            servicesInfo.push({
                id:services[i].id,
                name:services[i].name,
                price:services[i].price,
                description:services[i].description,
                paymentInfo:services[i].paymentInfo,
                deliveryInfo:services[i].deliveryInfo,
                eval: services[i].eval,
                type:"service"
                
            })
        }
        for (let i = 0; i < products.length; i++) {
            productsInfo.push({
                id:products[i].id,
                name:products[i].name,
                price:products[i].price,
                description:products[i].description,
                paymentInfo:products[i].paymentInfo,
                deliveryInfo:products[i].deliveryInfo,
                eval: products[i].eval,
                category:products[i].category,
                type:"product"
                
            })
        }
        for (let i = 0; i < tutorials.length; i++) {
            tutorialsInfo.push({
                curse: tutorials[i].curse,
                schedule: tutorials[i].schedule,
                tutor:tutorials[i].userEmail,
                topics:tutorials[i].topics,
                eval:tutorials[i].eval,
                type:"tutorial"
            })
        }
        const market=[...fileInfo,...servicesInfo,...productsInfo,...tutorialsInfo];
        
        log(chalk.bold.black.bgGreen("SE PUDO CREAR EL MARKET"));

        res.json(market);

    } catch (err) {
        log(chalk.bold.bgRed("NO SE PUDO LISTAR TODAS LAS PRACTICAS"));
        console.log("ERROR", e)
        res.json({
            msg: 'Error',
            detail: err
        });
    }


}
