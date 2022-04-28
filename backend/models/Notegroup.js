const mongoose = require('mongoose');
const { Schema } = mongoose;
const noteGroupSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type : String,
        required : true
    }
},{timestamps:true})
module.exports = mongoose.model('Notegroup',noteGroupSchema);