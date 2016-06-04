'use strict';

var fs = require('fs');

// Production specific configuration
// =================================
module.exports = {
    // Server IP
    ip:     process.env.OPENSHIFT_NODEJS_IP ||
            process.env.IP ||
            undefined,

    // Server port
    port:   process.env.OPENSHIFT_NODEJS_PORT ||
            process.env.PORT ||
            80,

    portSSL: 443,

    // MySQL connection options
    mysql: {
        "username": "root",
        "password": "v7suzAbrT6es",
        "database": "movement",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
    
};
