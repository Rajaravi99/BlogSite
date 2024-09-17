const mongoose=require('mongoose');
const Schema=mongoose.Schema; // creating Schema
const donorSchema=new Schema({
    userName:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    }
},{timestamps:true});
// exporting model of the schema created
const Donor=mongoose.model('donor', donorSchema);
module.exports=Donor;