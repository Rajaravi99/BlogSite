const express=require('express');
const router=express.Router();
const  userController=require('../controller/userController');
const User=require('../models/user');

router.get('/login',userController.user_login_get);
router.get('/signup',userController.user_signup_get);
router.post('/login',userController.user_login_post);
router.post('/signup',userController.user_signup_post);

module.exports=router;