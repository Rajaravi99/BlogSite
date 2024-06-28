const mongoose=require('mongoose');
const Schema=mongoose.Schema; // creating Schema
const blogSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    snippet:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
},{timestamps:true});
// exporting model of the schema created
const blog=mongoose.model('blog', blogSchema);
module.exports=blog;