require('dotenv').config();
const express = require('express'); // require express
const mongoose=require('mongoose'); // require mongoose for connecting to MongoDB
const morgan=require('morgan'); // required morgan for creating middlewares
const blogRoutes=require('./routes/blogRoutes');// required for creating express router
const userRoutes=require('./routes/userRoutes'); // required for creating authentication routes
const Blog=require('./models/blog'); // required blog schema and model
const app = express(); // create express app
const dbURI=process.env.db; // new to add hexadecimal if password include special characters
mongoose.connect(dbURI) // connecting to the database and then listening on port 3000
    .then((result)=>{
        app.listen(process.env.PORT || 3000); // listening at port 3000
        console.log('connected to DB');
    })
    .catch((err)=>{
        console.log(err);
    });

// creating middlewares
app.use(express.static('public')); // to use public folder to store middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // middleware to parse json bodies
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});
app.use(blogRoutes); // for creating blogroutes
app.use(userRoutes); // for creating authentication and user login and signup
app.set('view engine','ejs'); // set the view engine as express.JS
// creating various routes
app.get('/', (req,res) =>{
    // need to find the blog from MongoDM and then send to index page for parshing
    Blog.find().sort({ createdAt: -1 })
        .then((result)=>{
            res.render('index', { blogs: result, title: 'All blogs' });
        })
        .catch((err)=>{
            console.log(err);
        });
});

app.get('/about', (req,res) =>{
    res.render('about',{title: 'About'});
});
// redirecting a different route to original route
app.get('/about-us',(req,res)=>{
    res.redirect('about', {title: 'About'});
});

// want to update an existing 
// basic middleware
app.use((req,res) =>{
    res.status(404).render('404',{title: '404'});
});