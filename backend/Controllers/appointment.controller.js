const AppointmentModel = require('../Models/appointment.model')




const getAll = async(req,res) => {
  try{
    const data = await AppointmentModel.find()
    res.status(200).send(data)
  }
  catch(err){
    res.status(400).send({msg:err.message})
  }
}

const getByUserEmail = async(req,res) => {
    try{
    const email = req.query.email
     const data = await AppointmentModel.find({userEmail:email})
     res.status(200).send(data)
    }
    catch(err){
        res.status(401).send({msg: err.message})
        console.log(err)
    }
}


const getByLawyerEmail = async (req, res) => {
    try {
      const email = req.query.email;
      console.log(email)
      const data = await AppointmentModel.find({lawyerEmail: email });
      res.status(200).send(data);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Internal server error' });
    }
  };
  


const ConfirmAppointment = async (req,res)=> {
    try{
       payload = req.body;
    const book = new AppointmentModel(payload)
     await book.save()
    res.status(200).send({msg: "Appoinment confirmed"})
    }
    catch(err){
        res.status(401).send({msg: err.message})
        console.log(err)
    }
}

const DeleteAppointment = async(req,res) => {
    try{
      const data = await AppointmentModel.findByIdAndDelete(req.params.id)
      res.status(200).send({msg: "Appointment deleted"})
    }
    catch(err){
        res.status(401).send({msg: err.message})
        console.log(err)
    }
}



module.exports = {getAll,getByUserEmail,getByLawyerEmail,ConfirmAppointment,DeleteAppointment}