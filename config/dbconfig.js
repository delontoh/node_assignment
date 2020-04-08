const express = require('express');
const router = express.Router();
const db = require('./db');


/**
 * Create database
 */
router.get('/createDb', (req, res, next) => {
    const sql = 'CREATE DATABASE node_mysql';
    db.con.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        res.send('Database created successfully!');
    })
});

module.exports = router;