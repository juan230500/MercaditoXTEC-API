
const db = require('../config/db.config.js');
const jwt = require('jsonwebtoken');
const chalk = require('chalk');

const log = console.log;
const Tutorial = db.Tutorial;


exports.create = async (req, res) => {
    let tutorial = {};

    try{
        // Building Client object from upoading request's body
        tutorial.curse = req.body.curse;
        tutorial.schedule = req.body.schedule;
        tutorial.score=req.body.score;
        tutorial.topics=req.body.topics;
        tutorial.userEmail= req.user.email;
        tutorialCreated= await Tutorial.create(tutorial);
        log(chalk.bold.black.bgGreen("SE CREO LA TUTORIA DE MANERA EXITOSA"));
        res.status(200).json({
            message: "THIS IS THE TUTORIAL CREATED",
            tutorial: tutorialCreated,

        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
        log(chalk.bold.bgRed("NO SE PUDO CREAR LA TUTORIA"));
        console.log("ERROR",error)
    }
}




exports.retrieveAllTutorials =  async (req, res) => {
    // find all Customer information from 
    try{
        let tutorials=  await Tutorial.findAll();
        res.status(200).json({
            message: "THIS ARE ALL THE TUORIALS",
            tutorial: tutorials
        });
    }
    catch(e){
        log(chalk.bold.bgRed("NO SE PUDO OBTENER TODAS LAS TUTORIAS"));
        console.log("ERROR",error)
          res.status(500).json({
              message: "Error!",
              error: error
          });
    }
}



exports.getTutorialById = async (req, res) => {
    // find all Customer information from 
    
    try{
      let tutorialId = req.params.id;
        const tutorial= await Tutorial.findByPk(tutorialId);
        console.log("EST ES LA TUTORIA",tutorial)
        res.status(200).json(tutorial);
    }catch(e){
      res.status(500).json({error:e});
    }
  }


