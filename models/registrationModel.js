const registrationModel = module.exports;
// const databasHelper = require('../helpers/databaseHelper');
const generalHelper = require('../helpers/generalHelper');
let { isEmpty, generateId } = generalHelper;
const ModelSchema = require('./model_schemas/index');
const TeacherStudentRelation = ModelSchema.TeacherStudentRelation;

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
    let teacher_student_relation_id = generateId();
    let newRelation = await TeacherStudentRelation.create({
        teacher_student_relation_id: teacher_student_relation_id,
        student_fk: student_id,
        teacher_fk: teacher_id
    });
    return newRelation.dataValues ? newRelation.dataValues : newRelation;
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
    let result = await TeacherStudentRelation.findAll({where: { teacher_fk: teacher_id,  student_fk: student_id}});
    result = result.length > 0 ? result[0] : [];
    // returns true if result is not empty
    if(!isEmpty(result)) {
        return true;
    } else {
        return false;
    }
}

/*
******************************* Non Sequelize Queries *******************************
 */

// /**
//  *
//  * @param {*} req
//  * @param {string} student_id
//  * @param {string} teacher_id
//  * @returns {Promise<*>}
//  */
// registrationModel.createTeacherStudentsRelation = async function (req, student_id, teacher_id) {
//     if(isEmpty(student_id) || isEmpty(teacher_id)) {
//         return [];
//     }
//     let tableName = 'teacher_student_relation';
//     let teacher_student_relation_id = generateId();
//     let sql = `INSERT INTO ${tableName} (teacher_student_relation_id, teacher_fk, student_fk) VALUES(?, ?, ?)`;
//     return await databasHelper.query(req, sql, [teacher_student_relation_id, teacher_id, student_id]);
// }

// /**
//  * Get teacher and student relation record by their ids
//  * @param {*} req
//  * @param {string} teacher_id
//  * @param {string} student_id
//  * @returns {Promise<boolean>} Returns true if record is found
//  */
// registrationModel.getTeacherAndStudentRelation = async function (req, teacher_id, student_id) {
//     if(isEmpty(student_id) || isEmpty(teacher_id)) {
//         return false;
//     }
//     let tableName = 'teacher_student_relation';
//     let sql = `SELECT teacher_student_relation_id
//                FROM ${tableName}
//                WHERE teacher_fk = ? AND student_fk = ?`;
//     let result = await databasHelper.query(req, sql, [teacher_id, student_id]);
//     if(!isEmpty(result)) {
//         return true;
//     } else {
//         return false;
//     }
// }