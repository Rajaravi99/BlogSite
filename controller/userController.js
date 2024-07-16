const User=require('../models/user');
const bcrypt=require('bcrypt');

const user_login_get=(req,res)=>{
    res.render('authentication/login',{title:'Login Form'});
}

const user_signup_get=(req,res)=>{
    res.render('authentication/signup', {title:'SignUp Form'});
}
const user_login_post=async(req,res)=>{
    // checks if userName and password is valid, if not gives popup invalid username or password
    // if valid loads the index page
    const userName=req.body.userName;
    const password=req.body.password;
    const check = await User.findOne({ userName: userName });
    if (!check) {
        res.send("Username cannot be found");
    }
    else{
        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch =await bcrypt.compare(password, check.password);
        if (!isPasswordMatch) {
            res.send("wrong Password");
        }
        else {
            res.redirect('/');
        }
    }
}

const user_signup_post=async(req,res)=>{
    const exists=await User.findOne({userName: req.body.userName});
    if(exists){
        res.send('Username already exists, go back and try with different username');
    }
    else{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword; // Replace the original password with the hashed one
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
module.exports={
    user_login_get,
    user_signup_get,
    user_login_post,
    user_signup_post
};