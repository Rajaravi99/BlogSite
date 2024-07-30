const express=require('express');
const router=express.Router();
const passport=require('passport'); // required passport for authentication stretegy
const expressSession=require('express-session');
const {initialisingPassport,isAuthenticated}=require('../passportConfig.js');
const  userController=require('../controller/userController');
const User=require('../models/user');
router.use(expressSession({secret:'secret', resave:'false', saveUninitialized:'false'}));
router.use(passport.initialize());
router.use(passport.session());

router.get('/login',userController.user_login_get);
router.get('/signup',userController.user_signup_get);
router.post('/login',passport.authenticate('local',{failureRedirect:'/signup',failureMessage:true}),userController.user_loggedIn);
router.post('/signup',userController.user_signup_post);
router.post('/logout',isAuthenticated,userController.user_loggedOut);

module.exports=router;