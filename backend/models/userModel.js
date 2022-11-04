const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    name:{
        type: String,
        required: [true, 'please add a name'],
        minlength: [2, 'to short'],
        maxlength: [32, ' too long'],

    },
    email: {
        type: String,
        required: [true, 'please add an email'],
        unique:true
    },
    password: {
        type: String,
        required: [true, 'please add  password'],
       
    }

}, { timestamps: true })


module.exports = mongoose.model('User', userSchema)