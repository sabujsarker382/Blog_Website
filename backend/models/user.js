const mongoose = require('mongoose');
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        
        trim:true,
        minLength:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowerCase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('user',userSchema);

