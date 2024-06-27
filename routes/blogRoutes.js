const express=require('express');
const router=express.Router();
const  blogController=require('../controller/blogController');
const Blog=require('../models/blog');

router.get('/blogs/create',blogController.blog_create_get);
router.post('/blogs/create',blogController.blog_create_post);
router.get('/blogs/:id',blogController.blog_details);
router.get('/blogs/e/:id',blogController.blog_edit_get);
router.delete('/blogs/:id',blogController.blog_delete);
router.post('/blogs/:id',blogController.blog_edit_put);

module.exports=router;