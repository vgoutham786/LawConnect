const express=require('express');
const cors=require("cors")
const app=express();
app.use(express.json());

app.use(cors())
const  connection  = require('./config/mongo');
const  {signinRoute}  = require('./Routes/sigin.route');








app.use("/user",signinRoute);
