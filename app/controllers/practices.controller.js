var stream = require('stream');
const db = require('../config/db.config.js');
const chalk = require('chalk');
const jwt = require('jsonwebtoken');

const log = console.log;

const Practice = db.Practice;

const User = db.User;



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
            id: practiceCreated.dataValues.id,
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



exports.listAllPractices = async (req, res) => {
    try {
        const files = await Practice.findAll({
            attributes: ['id', 'name']
        });
        const fileInfo = [];

        console.log(files);

        for (let i = 0; i < files.length; i++) {
            fileInfo.push({
                filename: files[i].name,
                url: "/file/" + files[i].dataValues.id
            })
        }
        log(chalk.bold.black.bgGreen("SE PUDO LISTAR TODAS LAS PRACTICAS"));

        res.json(fileInfo);

    } catch (err) {
        log(chalk.bold.bgRed("NO SE PUDO LISTAR TODAS LAS PRACTICAS"));
        console.log("ERROR", e)
        res.json({
            msg: 'Error',
            detail: err
        });
    }


}

exports.downloadFile = (req, res) => {
    Practice.findByPk(req.params.id).then(file => {
        var fileContents = Buffer.from(file.data, "base64");
        var readStream = new stream.PassThrough();
        readStream.end(fileContents);

        res.set('Content-disposition', 'attachment; filename=' + file.name);
        res.set('Content-Type', file.type);

        readStream.pipe(res);
    }).catch(err => {
        console.log(err);
        res.json({
            msg: 'Error',
            detail: err
        });
    });
}



exports.getPracticeById = async (req, res) => {
    // find all Customer information from 

    try {
        let practiceId = req.params.id;
        const practice = await Practice.findByPk(practiceId);
        let result = {
            id: practice.id,
            curse: practice.curse,
            paymentInfo: practice.paymentInfo,
            price: practice.price,
            topics: practice.topics
        }
        console.log("EST ES LA PRACTICA", result)
        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({
            error: e
        });
    }
}


exports.updateById = async (req, res) => {
    try {
        let practiceId = req.params.id;
        let practice = await Practice.findByPk(practiceId);

        if (!practice) {
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a PRACTICE with id = " + practiceId,
                customer: "",
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                type: practice.type,
                name: practice.name,
                data: practice.data,
                curse: practice.curse,
                paymentInfo: practice.paymentInfo,
                price: practice.price,
                topics: practice.topics,
                userEmail: practice.userEmail,
                typeSolution: req.file.mimetype,
                nameSolution: req.file.originalname,
                dataSolution: req.file.buffer,

            }
            let result = await Practice.update(updatedObject, {
                returning: true,
                where: {
                    id: practiceId
                }
            });

            // return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update the practice with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully the practice with id = " + req.params.id
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a customer with id = " + req.params.id,
            error: error.message
        });
    }
}