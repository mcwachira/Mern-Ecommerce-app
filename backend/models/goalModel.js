const mongoose = require('mongoose')

const goalsSchema = new mongoose.Schema({



    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        
        //the model it references
        ref:'User',
    }
,
    name: {
       type: String,
       required:[true, 'please add a name'],
        minlength: [2, 'to short'],
        maxlength: [32, ' too long'],

    },
    description:{
      type:  String,
        required: [true, 'please add a description'],

    }

}, { timestamps: true })



module.exports = mongoose.model('Goals', goalsSchema)