const express=require('express');
const router=express.Router();
const feedbackController=require('../controller/feedbackContoller');
const {initialisingPassport,isAuthenticated}=require('../passportConfig.js');
// all the rotes will be handeled here
router.get('/feedback',isAuthenticated,feedbackController.feedback_get);
router.post('/feedback',isAuthenticated,feedbackController.feedback_post);
module.exports=router;