const express=require('express');
const router=express.Router();
const paymentController=require('../controller/paymentController');

router.get('/payment',paymentController.payment_get);

module.exports=router;