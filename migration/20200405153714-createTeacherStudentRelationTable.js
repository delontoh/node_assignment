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
    script = '20200405153714-createTeacherStudentRelationTable';

exports.up = function(db, callback) {
    let sql = `CREATE TABLE \`teacher_student_relation\` (
            \`teacher_student_relation_id\` VARCHAR(50) NOT NULL DEFAULT '',
            \`student_fk\` VARCHAR(50) DEFAULT NULL,
            \`teacher_fk\` VARCHAR(50) DEFAULT NULL,
            \`created_by\` VARCHAR(50) DEFAULT NULL,
            \`created_date\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`updated_by\` VARCHAR(50) DEFAULT NULL,
            \`updated_date\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (\`teacher_student_relation_id\`)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8`;
    db.runSql(sql, callback);
    console.log(`Author: ${author}, Script Name: ${script}`);
};

exports.down = function(db, callback) {
    let sql = `DROP TABLE \`teacher_student_relation\``;
    db.runSql(sql, callback);
    console.log(`Author: ${author}, Script Name: ${script}`);
};

exports._meta = {
    "version": 1
};
