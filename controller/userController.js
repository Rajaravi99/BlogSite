const User=require('../models/user');
const bcrypt=require('bcrypt');

const user_login_get=(req,res)=>{
    res.render('authentication/login',{title:'Login Form'});
}

const user_signup_get=(req,res)=>{
    res.render('authentication/signup', {title:'SignUp Form'});
}

const user_signup_post=async(req,res)=>{
    const exists=await User.findOne({userName: req.body.userName});
    if(exists){
        res.send('Username already exists, go back and try with different username');
    }
    else{
        const user=new User(req.body);
        user.save()
            .then((result)=>{
                res.redirect('/login');
            })
            .catch((err)=>{
                console.log(err);
            });
    }
}

const user_loggedIn=async(req,res)=>{
    res.redirect('/');
}

const user_loggedOut=(req,res,next)=>{
    req.logOut((err)=>{
        if (err) { return next(err); }
        res.redirect('/');
    });
}

module.exports={
    user_login_get,
    user_signup_get,
    user_signup_post,
    user_loggedIn,
    user_loggedOut
};