const feedback=require('../models/feedback.js');
const flash=require('connect-flash');

const feedback_get=(req,res)=>{
    res.render('feedback');
};

const feedback_post=(req,res)=>{
    const obj=new feedback(req.body);
    obj.save()
        .then((result)=>{
            
            res.redirect('/');
        })
        .catch((error)=>{
            console.log(error);
        });
};
module.exports={
    feedback_get,
    feedback_post
};