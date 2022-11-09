const mongoose = require('mongoose')

const goalsSchema = new mongoose.Schema({



    //connecting the specific user to the goal created
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

// console.log(Schema)

module.exports = mongoose.model('Goals', goalsSchema)