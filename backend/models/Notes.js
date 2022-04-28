const mongoose = require('mongoose');
const { Schema } = mongoose;
const notesSchema = new Schema({
    group:{
        type:Schema.Types.ObjectId,
        ref:'Notegroup'
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type : String,
        required : true
    },
    description:{
        type:String,
    },
    tag:{
        type:String,
        default:"General"
    },
},{timestamps:true})
module.exports = mongoose.model('notes',notesSchema);