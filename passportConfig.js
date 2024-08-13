
const localStrategy=require('passport-local').Strategy;
const User=require('./models/user.js');

exports.initialisingPassport=(passport)=>{
    // use it like a tamplet code
    passport.serializeUser((user, cb)=>{
      return cb(null,user.id);
    });
    passport.deserializeUser(async(id, done)=>{
        User.findById({_id:id}).then((result)=>{
          done(null,result);
        }).catch((err)=>{
            done(err,false);
        });
    });

    passport.use(new localStrategy({
        usernameField:'userName',
        passwordField:'password'
    },(username,password,done)=>{
        User.findOne({userName:username}).then((result)=>{
            if(!result){
                return done(null,false);
            }
            if(result.password!==password){
                return done(null,false);
            }
            return done(null,result);
        })
    }));
};

exports.isAuthenticated=(req,res,next)=>{
    if(req.user){
        return next(req.userName);
    }
    res.redirect('/login');
};
