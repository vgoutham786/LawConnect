
const { LawyerModel } = require('../Models/lawyer.model')

const addLawyer = async (req, res) => {
    const payload = req.body
    try {
        const islowerPresent = await LawyerModel.findOne({ email: payload.email })
        if (islowerPresent) return res.send({ msg: "Laywer already present" })
        const newLawyer = new LawyerModel(payload)
        newLawyer.save()
        res.status(200).send({ msg: "Laywer added successfully!" })
    }
    catch (err) {
        res.status(400).send({ msg: err.message })
        console.log(err)
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