const { LawyerModel } = require("../Models/lawyer.model");

const myChat = async (req, res) => {
    const { lawyerId, email } = req.query;
    try {
      const temp = await LawyerModel.findOne({ email: lawyerId });
      let messages = [...temp.messages];
      let chats = [];
      let checker = false;
      for (let i = 0; i < messages.length; i++) {
        if (messages[i].userEmail == email) {
          chats = messages[i].chats;
          checker = true;
          break;
        }
      }
      if (checker) {
        res.json(chats);
      } else {
        messages.push({
          userEmail: email,
          chats: [],
        });
        await LawyerModel.findOneAndUpdate({ email: lawyerId }, { messages });
        res.json([]);
      }
    } catch (error) {
      res.json({ error: error.message });
    }
  }

module.exports = {myChat}