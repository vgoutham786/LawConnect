const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  lawyerId: String,
  name: String,
  email: String,
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



  