require('dotenv').config();
const express = require('express'); // require express
const mongoose=require('mongoose'); // require mongoose for connecting to MongoDB
const morgan=require('morgan'); // required morgan for creating middlewares
const passport=require('passport'); // required passport for authentication stretegy
const stripe=require('stripe')('process.env.STRIPE_SECRET_KEY'); // required for stripe payment gateway integration
const expressSession=require('express-session'); // required for creating and maintaining login sessions
const blogRoutes=require('./routes/blogRoutes');// required for creating express router
const userRoutes=require('./routes/userRoutes'); // required for creating authentication routes
const paymentRoutes=require('./routes/paymentRoutes'); // required for handeling stripe payment gateway
const Blog=require('./models/blog'); // required blog schema and model
const User=require('./models/user.js'); // required user schems if needed
const socket=require('socket.io'); // require socket to create websockets for chatroom
const chatRoutes=require('./routes/chatRoutes'); // required for creating chatroom for fun
const {initialisingPassport}=require('./passportConfig.js');
const app = express(); // create express app
const flash = require('connect-flash'); // for alerting the user if he is loggein or loggeout
const dbURI=process.env.db; // new to add hexadecimal if password include special characters
mongoose.connect(dbURI) // connecting to the database and then listening on port 3000
var server=app.listen(process.env.PORT || 3000); // listening at port 3000
console.log('connected to DB');
// creating middlewares
initialisingPassport(passport);
app.use(express.static('public')); // to use public folder to store middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // middleware to parse json bodies
app.use(expressSession({secret:'secret', resave:'true', saveUninitialized:'false',cookie:{maxAge:300000}}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// socketsetup on serverside
const io=socket(server,{
    cors:{
        option:`http://localhost:${process.env.PORT}`,
    }
});
io.on('connection',(socket)=>{
    console.log(socket.id);
    // Handle chat event
    socket.on('chat', (data)=>{
        io.sockets.emit('chat', data);// listining to all the sockets connected to the server for now
    });
    socket.on('typing', (data)=>{ // broadcasting to all the sockets connected to the server 
        socket.broadcast.emit('typing', data);
    });
    // handle connection event
    socket.on('send-location',(data)=>{
        io.emit('receive-location',{
            id:socket.id,
            ...data
        });
    });
});
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});
app.use(blogRoutes); // for creating blogroutes
app.use(userRoutes); // for creating authentication and user login and signup
app.use(chatRoutes); // for creating chatroom
app.use(paymentRoutes); // for payment purpose
app.set('view engine','ejs'); // set the view engine as express.JS
// creating various routes
app.get('/', (req,res) =>{
    if(req.user===undefined){
        Blog.find().sort({ createdAt: -1 })
        .then((result)=>{
            res.render('index', { blogs: result, title: 'All blogs',message: req.flash('info')});
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    else{
        Blog.find().sort({ createdAt: -1 })
        .then((result)=>{
            res.render('index', { blogs: result, title: 'All blogs',message: req.flash('info')});
        })
        .catch((err)=>{
            console.log(err);
        });
    }
});

app.get('/about', (req,res) =>{
    res.render('about',{title: 'About'});
});

// want to update an existing 
// basic middleware
app.use((req,res) =>{
    res.status(404).render('404',{title: '404'});
});

