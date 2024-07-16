const mongoose=require('mongoose');
const Schema=mongoose.Schema; // creating Schema
const userSchema=new Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});
// exporting model of the schema created
const user=mongoose.model('user', userSchema);
module.exports=user;