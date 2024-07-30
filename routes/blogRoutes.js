const express=require('express');
const router=express.Router();
const passport=require('passport');
const {initialisingPassport,isAuthenticated}=require('../passportConfig.js');
const  blogController=require('../controller/blogController');
const Blog=require('../models/blog');
const User=require('../models/user');

router.get('/blogs/create',isAuthenticated,blogController.blog_create_get); // to achive this user needs to be authenticated or loggedin
router.post('/blogs/create',isAuthenticated,blogController.blog_create_post); // to achive this user needs to be authenticated or loggedin
router.get('/blogs/:id',blogController.blog_details);
router.get('/blogs/e/:id',isAuthenticated,blogController.blog_edit_get); // to achive this user needs to be authenticated or loggedin
router.delete('/blogs/:id',blogController.blog_delete);
router.post('/blogs/:id',isAuthenticated,blogController.blog_edit_put); // to achive this user needs to be authenticated or loggedin

module.exports=router;