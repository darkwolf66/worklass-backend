var mysql = require("mysql");
 
var config = {
    db:{
        queueLimit : 0, // unlimited queueing
        connectionLimit : 0, // unlimited connections
        host: "127.0.0.1",
        user: "workless",
        password: "k4tu4b431",
        database: "workass"
    }
};

module.exports = config;