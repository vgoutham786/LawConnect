const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  lawyerId: String,
  name: String,
  email: String,
  password: String,
  address: String,
  bio: String,
  skills: [String],
  profession: String,
  gender: String,
  phone: Number,
  image: String,
  price: String,
  verify: Boolean,
  languages: [String],
  rating: Number,
  experience: String,
  email: String,
  Rank: Number,
  messages: [
    {
      userEmail: String,
      chats: [
        {
          textMsg: String,
          sendBy: String,
        },
      ],
    },
  ],
});

const LawyerModel = mongoose.model("lawyer", schema);

module.exports = { LawyerModel };

