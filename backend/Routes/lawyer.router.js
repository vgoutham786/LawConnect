const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const express = require('express')
const lawyerRouter = express.Router()
const {LawyerModel} = require('../Models/lawyer.model')

// add new lawyer
lawyerRouter.post("/addLawyer",async(req,res)=>{
    const payload = req.body
    try{
     const islowerPresent =  await LawyerModel.findOne({email:payload.email})
     if(islowerPresent) return res.send({msg: "Laywer already present"})
     const newLawyer = new LawyerModel(payload)
     newLawyer.save()
     res.status(200).send({msg: "Laywer added successfully!"})
    }
    catch(err){
        res.status(400).send({msg: err.message})
        console.log(err)
    }
}) 
   
//getall lawyer
lawyerRouter.get("/getLawyer",async(req,res)=>{
    try{
        const Laywer = await LawyerModel.find()
        res.status(200).send(Laywer)
       }
       catch(err){
           res.status(400).json({err: err.message})
           console.log(err)
       }
})

//get lawyer by id

lawyerRouter.get("/getLawyerById/:id",async(req,res)=>{
    try{
        const Laywer = await LawyerModel.findById(req.params.id)
        res.status(200).send(Laywer)
       }
       catch(err){
           res.status(400).json({err: err.message})
           console.log(err)
       }
})

// get lawyer profile

lawyerRouter.get("/lawyerProfile",async(req,res)=>{
    try {
        const { email } = req.query;
        const data = await LawyerModel.findOne({ email });
        res.json(data)
      } catch (error) {
        res.send("no data found");
      }
})

module.exports={lawyerRouter}
