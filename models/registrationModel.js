const registrationModel = module.exports;
const databasHelper = require('../helpers/databaseHelper');
const generalHelper = require('../helpers/generalHelper');
let { isEmpty, generateId } = generalHelper;

/**
 *
 * @param {*} req
 * @param {string} student_id
 * @param {string} teacher_id
 * @returns {Promise<*>}
 */
registrationModel.createTeacherStudentsRelation = async function (req, student_id, teacher_id) {
    if(isEmpty(student_id) || isEmpty(teacher_id)) {
        return [];
    }
    let tableName = 'teacher_student_relation';
    let teacher_student_relation_id = generateId();
    let sql = `INSERT INTO ${tableName} (teacher_student_relation_id, teacher_fk, student_fk) VALUES(?, ?, ?)`;
    return await databasHelper.query(req, sql, [teacher_student_relation_id, teacher_id, student_id]);
}

/**
 * Get teacher and student relation record by their ids
 * @param {*} req
 * @param {string} teacher_id
 * @param {string} student_id
 * @returns {Promise<boolean>} Returns true if record is found
 */
registrationModel.getTeacherAndStudentRelation = async function (req, teacher_id, student_id) {
    if(isEmpty(student_id) || isEmpty(teacher_id)) {
        return false;
    }
    let tableName = 'teacher_student_relation';
    let sql = `SELECT teacher_student_relation_id 
               FROM ${tableName} 
               WHERE teacher_fk = ? AND student_fk = ?`;
    let result = await databasHelper.query(req, sql, [teacher_id, student_id]);
    if(!isEmpty(result)) {
        return true;
    } else {
        return false;
    }
}