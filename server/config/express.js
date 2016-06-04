'use strict';

var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var config = require('./environment');
var session = require('express-session');
var compression = require('compression');

module.exports = function(app) {

    app.use(compression(function shouldCompress(req, res) {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(session({ secret: '!7ezatrAFEyecRuPuCda@56jeredAasdfsAwr5pruvANSPd23-*Re4ruZ&WRaS=ew4aaöhiuguehfsdasd324436435432rezutrarupchUnE!#?Pa5We$r' }));

    // Error handler - has to be last
    app.use(errorHandler());
};
