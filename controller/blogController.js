const Blog=require('../models/blog');
const User=require('../models/user');

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

const blog_get_comment=async(req,res)=>{
    Blog.findById(req.params.id)
    .then((result)=>{
        res.render('addComment',{blogs:result, title:'Edit Blog'});
    })
    .catch((err)=>{console.log(err);});
};
const blog_post_comment=async(req,res)=>{
    const exists=await Blog.findById(req.params.id);
    if(exists){
        exists.comment.push(req.body);
        Blog.findByIdAndUpdate(req.params.id,exists,{new:true})
        .then((result)=>{
            res.redirect(`/blogs/${req.params.id}`);
        }).catch((err)=>{
            console.log(err);
        });
    }
    else{
        console.log('this blog does not exists');
    }
};

const blog_get_comments=async(req,res)=>{
    const blogs=await Blog.findById(req.params.id);
    res.render('comments',{blogs:blogs,comment:blogs.comment,title:'Blog Comments'});
};

const blog_delete_comment=async(req,res)=>{
    const exists=await Blog.findById(req.params.id);
    if(exists){
        const arr=exists.comment;
        const str=req.body.data;
        let idx=-1;
        for(let i=0;i<arr.length;i++){
            if(arr[i].comment===str){
                idx=i;
                break;
            }
        }
        if(idx!=-1){
            const newArr=arr.splice(idx,1);
            exists.comment=newArr;
            Blog.findByIdAndUpdate(req.params.id,exists,{new:true})
            .then((result)=>{
                res.redirect(`/blogs/${req.params.id}`);
            }).catch((err)=>{
                console.log(err);
            });
        }
        else{
            console.log('nothing to delete');
        }
    }
    else{
        console.log('blog does not exists');
    }
};

module.exports={
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_edit_get,
    blog_edit_put,
    blog_get_comment,
    blog_post_comment,
    blog_get_comments,
    blog_delete_comment
};