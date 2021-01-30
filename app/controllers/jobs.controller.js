
const db = require('../config/db.config.js');
const jwt = require('jsonwebtoken');
const chalk = require('chalk');

const log = console.log;

const Job = db.Job;

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
    let job = {};

    try{
        // Building Client object from upoading request's body
        job.name = req.body.name;
        job.description = req.body.description;
        job.requirements = req.body.requirements;
        job.salary = req.body.salary;
        job.position = req.body.position;

       
        jobCreated= await Job.create(job);
        log(chalk.bold.black.bgGreen("SE CREO LA OFERTA LABORAL DE MANERA EXITOSA"));
        res.status(200).json({ jobCreated });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
        log(chalk.bold.bgRed("NO SE PUDO CREAR LA OFERTA LABORAL"));
        console.log("ERROR",error)
    }
}







exports.retrieveAllJobs = async (req, res) => {
    // find all Customer information from 

    try{
        jobs= await Job.findAll();
        res.status(200).json({ jobs
        });

    }
    catch(e){
        res.status(500).json({
            Error: "THERE WAS A ERROR GETTING AL JOBS"
        });
        log(chalk.bold.bgRed("NO SE PUDO BRINDAR TODAS LAS  OFERTAS"));
        console.log("ERROR",e);

    }
   
       
}

exports.getJobById = async (req, res) => {
    // find all Customer information from 
    
    try{
      let jobId = req.params.id;
        const job= await Job.findByPk(jobId );
        // console.log("EST ES EL PRODUCTO",product)
        res.status(200).json(job);
    }catch(e){
      res.status(500).json({error:e});
    }
  }
  





