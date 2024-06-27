const Blog=require('../models/blog');

const blog_edit_get=(req,res) =>{
    Blog.findById(req.params.id)
    .then((result)=>{
        res.render('edit',{blogs:result, title:'Edit Blog'});
    })
    .catch((err)=>{console.log(err);});
};

const blog_edit_put=(req,res)=>{
    const id=req.params.id;
    Blog.findByIdAndUpdate(id,req.body,{new:true})
    .then((result)=>{
        res.render('details', {blogs:result, title:'Blog Details'});
    })
    .catch((err)=>{
        console.log(err);
    });
};

const blog_details=(req,res)=>{
    const id=req.params.id;
    Blog.findById(id,)
        .then((result)=>{
            res.render('details', {blogs:result, title:'Blog Details'});
        })
        .catch((err)=>{
            console.log(err);
        });
};
const blog_create_get=(req,res)=>{
    res.render('create', {title: 'Create New Blog'});
};

const blog_create_post=(req,res)=>{
    const blog=new Blog(req.body);
    blog.save()
        .then((result)=>{
            res.redirect('/');
        })
        .catch((err)=>{
            console.log(err);
        });
};

const blog_delete=(req,res)=>{
    const id=req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result)=>{
            res.json({redirect:'/'});
        })
        .catch((err)=>{
            console.log(err);
        });
};

module.exports={
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_edit_get,
    blog_edit_put
};