/*jslint node: true */
'use strict';

var path = require('path');
var _ = require('lodash');

// Set default node environment to production
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Warn about production mode so developers don't accidentally connect to live database

if(process.env.NODE_ENV !== 'development') {
    console.log('RUNNING IN PRODUCTION ON LIVE DATABASE');
}

// All configurations will extend these options
// ============================================
var all = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Url of the server
    url: 'http://localhost',

    // Server port
    port: process.env.PORT || 80
    
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
    all,
    require('./' + process.env.NODE_ENV + '.js') || {});
