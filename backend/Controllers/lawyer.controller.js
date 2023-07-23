const bcrypt = require('bcrypt');

const { LawyerModel } = require('../Models/lawyer.model')

// const addLawyer = async (req, res) => {
//     const payload = req.body
//     try {
//         const islowerPresent = await LawyerModel.findOne({ email: payload.email })
//         if (islowerPresent) return res.send({ msg: "Laywer already present" })
//         const newLawyer = new LawyerModel(payload)
//         newLawyer.save()
//         res.status(200).send({ msg: "Laywer added successfully!" })
//     }
//     catch (err) {
//         res.status(400).send({ msg: err.message })
//         console.log(err)
//     }
// }

const addLawyer = async (req, res) => {
    const payload = req.body
    const email=payload.email
    console.log(payload)
    const user = await LawyerModel.find({ email: payload.email });
console.log(user)
    //console.log(Phone_No)
    try {
        //console.log(password)
        //console.log(user)
        if (user.length === 0) {
            console.log(payload.password)
            bcrypt.hash(payload.password, 5, async (err, hash) => {
                if (err) {
                    throw err
                }
                payload.password=hash
                let userp = await new LawyerModel({ ...payload});
                userp.save();
            });
                                                            //  sending email
            res.status(200).send({ msg: "Succesfully registered !" });         // response     
        }
        else {           
                res.status(400).send({ msg: "user already exist please Login!" })         

        }
    } catch (error) {
        console.log(error)
        res.status(400).send({ msg: "error can't register the user" })
    }

}

const getLawyer = async (req, res) => {
    try {

        const filters = req.query.filters
        if (!filters) {
            const allLawyer = await LawyerModel.find()
            return res.status(200).send(allLawyer)
        }
        let professions = []
        if (filters != "") {
            console.log("ok")
            professions = filters.split("-")

            const allLawyer = await LawyerModel.find({ profession: { $in: professions } })

            res.status(200).send(allLawyer)
        } else {
            const allLawyer = await LawyerModel.find()
            res.status(200).send(allLawyer)
        }
    }
    catch (err) {
        console.log(err.message);
        res.send({ msg: err.message })
    }
}

const getLawyerById = async (req, res) => {
    try {
        const Laywer = await LawyerModel.findById(req.params.id)
        res.status(200).send(Laywer)
    }
    catch (err) {
        res.status(400).json({ err: err.message })
        console.log(err)
    }
}

const getLawyerProfile = async (req, res) => {
    try {
        const { email } = req.query;
        const data = await LawyerModel.findOne({ email });
        res.json(data)
    } catch (error) {
        res.send("no data found");
    }
}



module.exports = { addLawyer, getLawyer, getLawyerById, getLawyerProfile }