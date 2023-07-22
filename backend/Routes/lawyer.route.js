const express = require('express')
const lawyerRouter = express.Router()
const {addLawyer, getLawyerById, getLawyer, getLawyerProfile} = require('../Controllers/lawyer.controller')


lawyerRouter.post("/addLawyer", addLawyer)
// lawyerRouter.post('/login',LoginRoute)
lawyerRouter.get("/getLawyer", getLawyer)
lawyerRouter.get("/getLawyerById/:id", getLawyerById)
lawyerRouter.get("/lawyerProfile", getLawyerProfile)
module.exports = lawyerRouter