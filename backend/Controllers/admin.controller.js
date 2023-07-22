const bcrypt = require('bcrypt')
const adminModel = require('../Models/admin.model')

const AllAdmins = async (req, res) => {
    try {
        const admin = await adminModel.find()
        res.send(admin)
    }
    catch (err) {
        res.status(400).json({ err: err.message })
        console.log(err)
    }
}

const getAdminbyID = async (req, res) => {
    try {
        const admin = await adminModel.findById(req.params.id)
        res.send(admin)
    }
    catch (err) {
        res.status(400).json({ err: err.message })
        console.log(err)
    }
}

const addAdmin = async (req, res) => {
    const payload = req.body;
    try {
        const admin = await adminModel.find({ email: payload.email });
        if (admin.length) {
            return res.status(401).json({ err: 'Admin already exist !' })
        }
        bcrypt.hash(payload['password'], 5, async (err, hash) => {
            if (err) return res.json({ err: err.message })
            payload['password'] = hash
            let newAdmin = new adminModel(payload)
            await newAdmin.save()

            res.status(200).json({ msg: "Admin has been created" })
        })
    }
    catch (err) {
        res.status(400).json({ err: err.message })
        console.log(err)
    }

}

module.exports = { AllAdmins, getAdminbyID, addAdmin }