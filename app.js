// console.log("Something...");
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const config = require('./config/database');
const passport = require('passport');

// using DOM-parser & json-parser as Body Parser Middleware
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

// Set Public Folder for scripts & css - will include content automatically
app.use(express.static(path.join(__dirname, 'public')));

// =============== Middleware ==============
	// ---- Session Middleware
        app.use(session({
            secret: 'keys',
            resave: true,
            saveUninitialized: true
        }));
        
    // ---- Messages Middleware

        app.use(require('connect-flash')());

        app.use((req, res, next)=>{
            res.locals.messages = require('express-messages')(req, res);
            next();
        });
       
	// ---- Validator Middleware
        app.use(expressValidator({
            errorFormatter: (param, msg,value) => {
                var namespace	= param.split('.')
                , root			= namespace.shift()
                , formParam		= root;
                while(namespace.length){
                    formParam += '[' + namespace.shift() + ']';
                }
                return{
                    param	: formParam,
                    msg		: msg,
                    value	: value
                };
            }
        }));
    
    // ---- Passsport Middleware
    require('./config/passport')(passport);
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('*', (req, res, next)=>{
        res.locals.user = req.user || null;
        next();
    });

// ==========================================

// mongoose connection to MongoDB
const mongoose = require('mongoose');
mongoose.connect(config.database, {
    useNewUrlParser: true
});

let db = mongoose.connection;

// Check Db connection
db.once('open', () => {
    console.log('Connected to MongoDB successful...');
});

// Check Db error
db.on('error', (err) => {
    console.log(err);
});

// Get Data from Models
let myProtocol = require('./models/protocol');
let myDevice = require('./models/device');

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// ============== Home Route
app.get('/', (req, res) => {
    myDevice.find((err, data) => {
        if(err){
            return console.error(err);
        }
        else{
            res.render('index', {
                pagetitle:'Digital Inteface Devices',
                devices: data
            });
        }
    }).populate('protocol').sort({_id:-1});
});

// ============== Other Routes

let DeviceRoutes = require('./routes/devices');
let ProtocolRoutes = require('./routes/protocols');
let SearchRoutes = require('./routes/search');
let UsersRoutes = require('./routes/users');

app.use('/device', DeviceRoutes);
app.use('/protocol', ProtocolRoutes);
app.use('/search', SearchRoutes);
app.use('/users', UsersRoutes);

// Start Server
app.listen(3000, function(){
    console.log('Server started on port 3000...')
});

