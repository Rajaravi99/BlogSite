const express=require('express');
const router=express.Router();
const chatController=require('../controller/chatController');

router.get('/chatroom',chatController.chat_get);

module.exports=router;