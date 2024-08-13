const User=require('../models/user');
const chat_get=(req,res)=>{
    res.render('chat/chat');
};

module.exports={
    chat_get
}