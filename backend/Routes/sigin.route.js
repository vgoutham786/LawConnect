const express=require('express');
const { UserModel } = require('../Models/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const nodemailer=require('nodemailer');
const otpGenerator = require('otp-generator')
const signinRoute=express.Router();
const path=require('path')
const otpverify=require("../Middleware/otp.middleware");
const { UserOTP } = require('../Models/otp.model');
const {BlacklistingModel}=require('../Models/blacklist.model')




signinRoute.post("/register",async(req,res)=>{
    const {Phone_No,email,password,Name , city }=req.body;
    const user=await UserModel.find({email});
   
    //console.log(Phone_No)
    try {
        
        //console.log(user)
        if(user.length===0){
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    throw err
                }
                let userp=await new UserModel({Name,email,password:hash,Phone_No,city , role:"user" , verify:false});
                 userp.save();
            });
            let OTP= otpGenerator.generate(6, { upperCaseAlphabets: true, specialChars: true }); //otp generation;
                let otp=new UserOTP({Useremail:email,otp:OTP,createdAt:new Date(),expireAt:new Date()+86400000});
                otp.save();                                                                          // saving the otp in backend
                let tokenOTP=jwt.sign({'Useremail':email},'masai');                    // token genration to pass unique email for verification through otp
                sendOTPforverification(email,OTP);                                                  //  sending email
                res.status(200).send({msg:"Please verify your email !","token":tokenOTP});         // response     
        }
        else{
            if(user[0].verify){
                res.status(400).send({msg:"user already exist please Login!"})
            }else{
                res.status(400).send({msg:"user already exist please verify your email !"})
            }
            
        }
    } catch (error) {
        res.status(400).send({msg:"error can't register the user"})
    }
    
})

signinRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        let user=await UserModel.find({email})
        if(user.length>0){
            if(user[0].verify){
                bcrypt.compare(password,user[0].password,async(err,result)=>{
                    if(err)
                    throw err;
                    if(result){
                        res.status(200).send({msg:"sucessfully Login!","token":jwt.sign({'userID':user[0]._id},'masai'),"Name":user[0].Name,"userData":user[0],"role":user[0].role})
                    }else{
                        res.status(400).send({msg:"Wrong credentials"})
                    }
                })
            }else{
                res.status(400).send({msg:"Verify your email first !"});
            }
        }else{
            res.status(400).send({msg:"Registered First!"})
        }
    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})


signinRoute.post("/verifyotp",otpverify, async(req,res)=>{
    const {Useremail,otp}=req.body;
    console.log(req.body);
    const user=await UserModel.find({email:Useremail});
    const databaseotp=await UserOTP.find({Useremail});
     try {
        //if(databaseotp.length>0){
            console.log("otp",otp)   
       if(otp==databaseotp[0].otp){
        await UserModel.findByIdAndUpdate(user[0]._id, { verify: true });
        await UserOTP.deleteMany({Useremail});
        res.status(200).json({msg:"Email verified"});
       }else{
        res.status(200).json({msg:"Wrong otp !"});
       }
     } catch (error) {
        res.status(500).send({msg:"Network error !"});
     }   
})

////////////
///////////
signinRoute.post("/lawyer-login",async(req,res)=>{
    const {email,password}=req.body;
    let user=await LawyerModel.find({email:email})  ;
    try {
        if(user.length>0){
            if(password===user[0].password){
                res.status(200).send({msg:"Login sucessfull !",Name:user[0].name,userData:user[0]});
            }else{
                res.status(200).send({msg:"wrong credentials !"});
            }
        }else{
            res.status(404).send({msg:"user doesn't exist !"})
        }
    } catch (error) {
        res.status(404).send({msg:"Network Error !"});
    }
})
///////////
//////////

///////////////////////////
signinRoute.post("/logout",async (req,res)=>{
    let token=req.headers.authorization.split(" ")[1];
   
    let blacklisttoken=await new BlacklistingModel({btoken:token});
    blacklisttoken.save();
    res.status(200).send({msg:"you are logedout!"})
});


/////////////////////////
const transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.email',
    port: 587,
    secure:false,
    auth: {
        user: 'law.connect.verify@gmail.com',
        pass: 'Aa1Bb2Cc3Dd4'
    }
});


function sendOTPforverification(email,otp){
    const subject = "Email Verification - Law Connect";
  const text = `Hello,\n\nThank you for signing up at Law Connect. Your One-Time Password (OTP) for email verification is: ${otp}\n\nPlease enter this OTP on the website to complete the verification process.\n\nIf you did not sign up for an account at Law Connect, please ignore this email.\n\nBest regards,\nThe Law Connect Team`;

  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
      <h2 style="color: #333;">Email Verification - Law Connect</h2>
      <p>Hello,</p>
      <p>Thank you for signing up at Law Connect.</p>
      <p><strong>Your One-Time Password (OTP) for email verification is:</strong></p>
      <p style="background-color: #fff; padding: 10px; border-radius: 5px;"><strong>${otp}</strong></p>
      <p>Please enter this OTP on the website to complete the verification process.</p>
      <p>If you did not sign up for an account at Law Connect, please ignore this email.</p>
      <p>Best regards,<br>The Law Connect Team</p>
    </div>
  `;

  transporter
    .sendMail({
      from: "law.connect.verify@gmail.com",
      to: email,
      subject: subject,
      text: text,
      html: html,
    })
    .then(() => {
      console.log("Email sent successfully");
    })
    .catch((err) => {
      console.log("Failed to send email:", err);
    });
}

module.exports={signinRoute}