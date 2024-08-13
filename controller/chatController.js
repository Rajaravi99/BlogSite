const User=require('../models/user');
const chat_get=(req,res)=>{
    //console.log(req.user);
    res.render('chat/chat',{user:req.user});
};

module.exports={
    chat_get
}