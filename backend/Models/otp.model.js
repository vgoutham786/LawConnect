const mongoose=require('mongoose');

const otpSchema=mongoose.Schema({
    Useremail:{
        
        type:String  
    },
    otp:String,
    createdAt:Date,
    expireAt:Date
})

const UserOTP=mongoose.model("OTP",otpSchema);

module.exports={UserOTP}