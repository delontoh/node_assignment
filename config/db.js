const mysql = require("mysql");
const dbConfig = (process.env.NODE_ENV || 'development') === 'development' ? require('./databaseDev.json') : require('./database.json');
let DB = module.exports;

DB.query = function(query, values, callback) {
    let isCalledBack = 0;
    setTimeout(() => {
        if (isCalledBack === 0) {
            console.log(`db.query: timeout`, {
                query: query,
                values: values ? JSON.stringify(values) : values
            });
        }
    }, 10000);
    DB.con.query(query, values, function (err, rows) {
        if (err) console.log('db.query', err ? JSON.stringify(err) : err);
        rows = rows ? JSON.parse(JSON.stringify(rows)) : [];
        isCalledBack = 1;
        callback(err, rows, this.sql);
    });
};

// connect to database
DB.connect = function(callback) {
    var self = this;
    DB.con.connect(function (err) {
        if (err) {
            console.log('Error connecting to Db');
            callback(false);
        }
        callback(true, self.con);
    })
};

// disconnect from database
DB.disconnect = function(callback) {
    DB.con.end(function (err) {
        callback();
    })
};

DB.handleDisconnect = (conn) => {
    conn.on('error', function(err) {
        if (!err.fatal) {
            return;
        }
        if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
            throw err;
        }
        console.log('Re-connecting lost connection: ' + err.stack);
        DB.con = mysql.createConnection(conn.config);
        DB.handleDisconnect(DB.con);
        DB.con.connect();
    });
};

// connect to db settings
DB.con = mysql.createConnection({
    host: dbConfig[process.env.NODE_ENV || 'development'].host,
    user: dbConfig[process.env.NODE_ENV || 'development'].user,
    password: dbConfig[process.env.NODE_ENV || 'development'].password,
    database: dbConfig[process.env.NODE_ENV || 'development'].database,
    timezone: 'utc'
});

DB.handleDisconnect(DB.con);