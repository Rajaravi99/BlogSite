const express=require('express');
const router=express.Router();
const chatController=require('../controller/chatController');
const {initialisingPassport,isAuthenticated}=require('../passportConfig.js');

router.get('/chatroom',isAuthenticated,chatController.chat_get);

module.exports=router;