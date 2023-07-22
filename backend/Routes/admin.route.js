const express = require('express')
const adminRouter = express.Router()

const { AllAdmins, getAdminbyID, addAdmin } = require('../Controllers/admin.controller')

adminRouter.get("/", (req, res) => {
    res.json("This is the admin route")
})

adminRouter.get("/AllAdmin", AllAdmins)
adminRouter.get('/getAdmin/:id', getAdminbyID)
adminRouter.post("/addAdmin", addAdmin)


module.exports = adminRouter