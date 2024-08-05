require('dotenv').config();
const express = require('express'); // require express
const mongoose=require('mongoose'); // require mongoose for connecting to MongoDB
const morgan=require('morgan'); // required morgan for creating middlewares
const passport=require('passport'); // required passport for authentication stretegy
const expressSession=require('express-session');
const blogRoutes=require('./routes/blogRoutes');// required for creating express router
const userRoutes=require('./routes/userRoutes'); // required for creating authentication routes
const Blog=require('./models/blog'); // required blog schema and model
const User=require('./models/user.js'); // required user schems if needed
const socket=require('socket.io'); // require socket to create websockets for chatroom
const chatRoutes=require('./routes/chatRoutes'); // required for creating chatroom for fun
const {initialisingPassport}=require('./passportConfig.js');
const app = express(); // create express app
const dbURI=process.env.db; // new to add hexadecimal if password include special characters
mongoose.connect(dbURI) // connecting to the database and then listening on port 3000
var server=app.listen(process.env.PORT || 3000); // listening at port 3000
console.log('connected to DB');
// socketsetup on serverside
const io=socket(server,{
    
});
io.on('connection',(socket)=>{
    console.log('made socket connection',socket.id);
    // Handle chat event
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);// listining to all the sockets connected to the server for now
    });
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});


// creating middlewares
initialisingPassport(passport);
app.use(express.static('public')); // to use public folder to store middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // middleware to parse json bodies
app.use(expressSession({secret:'secret', resave:'false', saveUninitialized:'false'}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});
app.use(blogRoutes); // for creating blogroutes
app.use(userRoutes); // for creating authentication and user login and signup
app.use(chatRoutes); // for creating chatroom
app.set('view engine','ejs'); // set the view engine as express.JS
// creating various routes
app.get('/', (req,res) =>{
    // need to find the blog from MongoDB and then send to index page for parshing
    Blog.find().sort({ createdAt: -1 })
        .then((result)=>{
            res.render('index', { blogs: result, title: 'All blogs'});
        })
        .catch((err)=>{
            console.log(err);
        });
});

app.get('/about', (req,res) =>{
    res.render('about',{title: 'About'});
});

// want to update an existing 
// basic middleware
app.use((req,res) =>{
    res.status(404).render('404',{title: '404'});
});

