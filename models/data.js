const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    
    employee_name: {
        type: String,
        required: true
    },
    employee_phone: {
        type: Number,
        required: true
    },
    employee_email: {
        type: String,
        required: true
    },
    employee_hobbies: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('datas', dataSchema)