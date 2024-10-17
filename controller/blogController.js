require('dotenv').config();
const Blog=require('../models/blog');
const User=require('../models/user');
const nodemailer=require('nodemailer');


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
        const str=req.params.data;
        let idx=-1;
        for(let i=0;i<arr.length;i++){
            if(arr[i].comment===str){
                idx=i;
                break;
            }
        }
        if(idx!=-1){
            arr.splice(idx,1);
            exists.comment=arr;
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

const blog_get_email=(req,res)=>{
    Blog.findById(req.params.id).then((result)=>{
        res.render('email',{blog:result,title:'Send this blog to my Email'});
    }).catch((err)=>{
        console.log(err);
    });
};

const blog_email_post=(req,res)=>{
    // console.log(req.body.email);
    // what i need to do is to send the blog to the specified email
    // i need to find the blog with req.params.id and then send it to the user email
    Blog.findById(req.params.id).then((result)=>{

        const transporter = nodemailer.createTransport({
            service:'gamil',
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
              user: process.env.user,
              pass: process.env.nodemailer_key,
            },
        });
        console.log(req.body);
        const mailOptions={
            from: {
                name: 'BlogChat Server',
                address: process.env.user
            }, // sender address
            to: [req.body.email], // list of receivers
            subject: "Blog from BlogChat server", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        }

        const sendMail=async(transporter, mailOptions)=>{
            try{
                transporter.sendMail(mailOptions);
                console.log('email sent');
                res.redirect('/');
            }catch (err){
                console.log(err);
            }
        };

        sendMail(transporter,mailOptions);

    }).catch((err)=>{
        console.log(err);
    });
}

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
    blog_delete_comment,
    blog_get_email,
    blog_email_post
};