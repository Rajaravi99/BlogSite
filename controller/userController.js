const user = require('../models/user');
const User=require('../models/user');
const Blog=require('../models/blog');
const bcrypt=require('bcrypt');
const flash = require('connect-flash');
const { reduce } = require('lodash');

const user_login_get=(req,res)=>{
    res.render('authentication/login',{message: req.flash('info')[0], title:'Login Form'});
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
    Blog.find().sort({ createdAt: -1 })
        .then((result)=>{
            req.flash('info', 'WoooHooo!!! you are loggedin');
            res.redirect('/');
        })
        .catch((err)=>{
            console.log(err);
        });
}

const user_loggedOut=(req,res,next)=>{
    req.logOut((err,user)=>{
        if (err) { return next(err); }
        req.flash('info', '!!! you are loggedout');
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