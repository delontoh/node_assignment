'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

var author = 'Delon Toh',
    script = '20200404155127-createStudentsTable';

exports.up = function(db, callback) {
    let sql = `CREATE TABLE \`students\` (
            \`student_id\` VARCHAR(50) NOT NULL DEFAULT '',
            \`email\` VARCHAR(50) DEFAULT NULL,
            \`status\` VARCHAR(12) DEFAULT NULL,
            \`created_by\` VARCHAR(50) DEFAULT NULL,
            \`created_date\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`updated_by\` VARCHAR(50) DEFAULT NULL,
            \`updated_date\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (\`student_id\`)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8`;
    db.runSql(sql, callback);
    console.log(`Author: ${author}, Script Name: ${script}`);
};

exports.down = function(db, callback) {
    let sql = `DROP TABLE \`students\``;
    db.runSql(sql, callback);
    console.log(`Author: ${author}, Script Name: ${script}`);
};

exports._meta = {
    "version": 1
};
