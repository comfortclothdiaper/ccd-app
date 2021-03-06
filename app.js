var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var fs = require('fs');
var routes = require('./routes/index');
var FileStreamRotator = require('file-stream-rotator');
var app = express();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://asmazabin:imdbest88@ds041566.mlab.com:41566/myccd');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://comfortclothdiaper:allah!$gr8@ds058369.mlab.com:58369/myccd');
// mongoose.connect('mongodb://localhost/CCD');
// view engine setup
// app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');
var retailerCtrl = require('../controller/becomeRetailer.server.controller.js');
app.set('port', (process.env.PORT || 5000));

//assign the swig view engine to .html files....
var swig = require('swig');
app.engine('html', swig.renderFile)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.get('/', function (request, response) {
  response.render('views/index')
});

app.post('/api/saveRetailerDetails', function (request, response) {
  return retailerCtrl.saveRetailerDetails(req, res);
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  next();
});

app.use('/api', routes);

// // create a write stream (in append mode)
var logDirectory = path.join(__dirname, 'log');

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(require('morgan')('combined', { stream: accessLogStream }, ':date'));
app.use(require('morgan')({ "stream": logger.stream }));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
