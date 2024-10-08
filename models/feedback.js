const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const feedbackSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    suggestion:{
        type:String,
        required:true
    }
},{timestamps:true});
module.exports=mongoose.model('feedback',feedbackSchema);
