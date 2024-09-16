const express=require('express');
const router=express.Router();
const paymentController=require('../controller/paymentController');

router.get('/payment',paymentController.payment_get);
router.post('/payment',paymentController.payment_post);
router.get('/cancelled',paymentController.payment_get_cancelled);
router.get('/cpmplete',paymentController.payment_get_success);

module.exports=router;