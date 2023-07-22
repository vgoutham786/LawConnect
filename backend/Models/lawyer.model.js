const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  lawyerId: String,
    email:{
        unique:true,
        type:String},
    Name:String,
    password:String,
    city:String,
    role:{type:String,default:"lawyer"},
    age:Number,
    verify:Boolean,
  address: String,
  bio: String,
  skills: [String],
  profession: String,
  gender: String,
  phone: Number,
  image: String,
  price: String,
  languages: [String],
  rating: Number,
  experience: String,
  Rank: Number,
  
});

const LawyerModel = mongoose.model("lawyer", schema);

module.exports = { LawyerModel };



  