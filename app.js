﻿/// <reference path="typings/node/node.d.ts"/>
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/_routes');

var nconf = require('nconf');

// Create nconf environtment 
nconf 
    .file({ file: 'config.json' }) 
    .env(); 

var foursquare_config = { 
    "secrets" : {
        "clientId" : nconf.get("foursquare_clientId"),
        "clientSecret" : nconf.get("foursquare_clientSecret"),
        "redirectUrl" : nconf.get("foursquare_redirectUrl")
    }
};
var foursquare = require('node-foursquare')(foursquare_config);


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.get('/login', function (req, res) {
    res.writeHead(303, { 'location': foursquare.getAuthClientRedirectUrl() });
    res.end();
});

app.get('/callback', function (req, res) {
    foursquare.getAccessToken({
        code: req.query.code
    }, function (error, accessToken) {
        if (error) {
            res.send('An error was thrown: ' + error.message);
        }
        else {
          // Save the accessToken and redirect.
          res.send(accessToken);
        }
    });
});


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
