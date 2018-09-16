var http = require('http'),
    path = require('path'),
    methods = require('methods'),
    express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    errorhandler = require('errorhandler');


const passport = require('passport'),
    LoginController = require('./controllers/login/loginCtr'),
    UsersController = require('./controllers/users'),
    auth = require('./controllers/login/auth');
require('./controllers/login/passport');
const config = require('config');
const mysqlConfig = config.get('mysql');
var isProduction = process.env.NODE_ENV === 'production';

// Create global app object
var app = express();

app.use(cors());

app.use(cors());
app.use(express.static(__dirname + '/../dist'));
app.use(cookieParser());
app.set('jwtTokenSecret', '123456ABCDEF');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
    key: 'jwtTokenSecret',
    secret: '123456ABCDEF',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1800000
    }
}));

app.use('/*', (req, res, next) => {
    // console.log('sessionID', req.sessionID);
    if (!req.session) {
        return next(new Error('oh no'))
    }
    next();
});
app.use(passport.initialize());
app.use(passport.session());


app.use(session({secret: 'conduit', cookie: {maxAge: 60000}, resave: false, saveUninitialized: false}));

if (!isProduction) {
    app.use(errorhandler());
}

// if (isProduction) {
//     mongoose.connect(process.env.MONGODB_URI);
// } else {
//     mongoose.connect('mongodb://localhost/conduit');
//     mongoose.set('debug', true);
// }

// require('./models/User');
// require('./models/Article');
// require('./models/Comment');
// require('./config/passport');

app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('API Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
    app.use(function (err, req, res, next) {
        // console.log(err.stack);
        res.status(err.status || 500);
        res.json({
            'errors': {
                message: err.message,
                error: err
            }
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        'errors': {
            message: err.message,
            error: {}
        }
    });
});

console.log(`MySQL : ${mysqlConfig.host}`);


const os = require('os');
setInterval(() => {
    const osMemory = os.totalmem();
    const osFreeMemory = os.freemem();
    const used = process.memoryUsage();
    console.error(`RAM Usage : ${Math.round(used['rss'] / 1024 / 1024 * 100) / 100} MB / ${Math.round(osMemory / 1024 / 1024 * 100) / 100} MB, System free : ${Math.round(osFreeMemory / 1024 / 1024 * 100) / 100} MB`);
}, 12000);


// finally, let's start our server...
var server = app.listen(process.env.PORT || 8080, function () {
    console.log(`Server running at http://localhost:${server.address().port}/`);
});
