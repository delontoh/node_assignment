const databaseHelper = module.exports;
const db = require('../config/db');

/**
 * Gets records from the database via a provided sql statement
 * @param {{storage: {db: { query: Function }}}} req Request object
 * @param {*} sql
 * @param {*} values
 * @returns {Promise<Array<any>>}
 */
databaseHelper.query = async function (req, sql, values) {
    return await _query_async(req, sql, values);
}

/**
 *
 * @param {{storage: {db: { query: Function }}}} req Request object
 * @param {string} query
 * @param {Array<string>} values
 * @returns {Promise<*>}
 * @private
 */
async function _query_async(req, query, values) {
    return new Promise((resolve, reject) => {
        db.query(query, values, function (err, rows) {
            if (err) {
                let error = new Error(`databaseHelper._query_async: SQL query error - ${err.message}`);
                reject(error);
            }
            else {
                resolve(rows);
            }
        });
    });
}