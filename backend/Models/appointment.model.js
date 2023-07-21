const mongoose = require('mongoose');
const appointmentSchema = mongoose.Schema({
    userName: {
        type: String,
    },
    lawyerName: {
        type: String,
    },
    lawyerEmail: {
        type: String,
        require: true
    },
    userEmail: {
        type: String,
        require: true
    },
    date: {
      type: String,
      require: true
    },
    meeting_type: {
        type: String,
        require: true
    },
    slotNumber: {
        type: Number,
        require: true
    },
    slot: {
        type: String,
        require: true
    }
}, { timestamps: true })
const AppointmentModel = mongoose.model('appointment', appointmentSchema);
module.exports = AppointmentModel;