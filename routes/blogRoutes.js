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
router.get('/blogs/comment/:id',isAuthenticated,blogController.blog_get_comment); // api route to handle add comment form response
router.post('/blogs/comment/:id',blogController.blog_post_comment); // this api route handles any new added comments
router.get('/blog/comment/view/:id',blogController.blog_get_comments); // this api route handles viewing of all the comments for any specific blog
router.post('/blog/delete/:id/:data',blogController.blog_delete_comment); // this api route handles deleting of comments something broken here

module.exports=router;