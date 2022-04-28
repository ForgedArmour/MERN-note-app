const mongoose = require('mongoose');
require('dotenv').config()

const mongoURI = process.env.DATABASE;
const connectToMongo = ()=>{
    mongoose.connect(mongoURI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>{
        console.log("Successfully connected to mongodb");
    })
    .catch((err)=>{
        console.log(err);
        console.log("Connection failed..");
    })
}
module.exports = connectToMongo;