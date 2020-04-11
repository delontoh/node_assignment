const studentsModel = module.exports;
// const databasHelper = require('../helpers/databaseHelper');
const Students = require('./model_schemas/Students');
const Teachers= require('./model_schemas/Teachers');
const TeacherStudentRelation = require('./model_schemas/TeacherStudentRelation');
const generalHelper = require('../helpers/generalHelper');
const constant = require('../config/constant');
let { isEmpty, generateId } = generalHelper;

/**
 * Get single student record by email
 * @param {*} req
 * @param {string} email
 * @returns {Promise<*>}
 */
studentsModel.getStudentByEmail = async function (req, email) {
    const funcName = 'studentsModel.getStudentByEmail';
    if(isEmpty(email)) {
        return [];
    }
    await Students.findAll({
        where: { email: email }
    }).then((records) => {
        let record = records[0];
        return record.dataValues;
    }).catch((err) => {
        console.log(`${funcName}: Failed to retrieve record\n Error: ${err}`);
    })
}

/**
 * Get students email and status by teacher email
 * @param {*} req
 * @param {string} email
 * @returns {Promise<*>}
 */
// studentsModel.getStudentsDataByTeacherEmail = async function (req, email) {
//     const funcName = 'studentsModel.getStudentsDataByTeacherEmail';
//     if(!email) {
//         return [];
//     }
//     let records = await Teachers.findAll({
//         include: [{
//             model: Students,
//             required: true,
//             attributes: ['email, status']
//         }],
//         where: {email: email},
//         group: 'email'
//     }).then((records) => {
//         let record = records[0];
//         console.log('record =>>', record)
//         return record.dataValues;
//     }).catch((err) => {
//         console.log(`${funcName}: Failed to retrieve record\n Error: ${err}`);
//     })
//     return records;
// }

// /**
//  * Get single student record by email
//  * @param {*} req
//  * @param {string} email
//  * @returns {Promise<*>}
//  */
// studentsModel.getStudentByEmail = async function (req, email) {
//     if(isEmpty(email)) {
//         return [];
//     }
//     const tableName = 'students';
//     let sql = `SELECT * FROM ${tableName} WHERE email IN (?)`;
//     let records = await databasHelper.query(req, sql, [email]);
//     return records[0];
// }

// /**
//  * Get students email and status by teacher email
//  * @param {*} req
//  * @param {string} email
//  * @returns {Promise<*>}
//  */
// studentsModel.getStudentsDataByTeacherEmail = async function (req, email) {
//     if(!email) {
//         return [];
//     }
//     let sql = `SELECT s.email AS email, s.status AS status FROM teacher_student_relation tsr
//                 INNER JOIN students s ON tsr.student_fk = s.student_id
//                 INNER JOIN teachers t ON tsr.teacher_fk = t.teacher_id
//                 WHERE t.email IN (?)
//                 GROUP BY s.email;`;
//     let records = await databasHelper.query(req, sql, [email]);
//     return records;
// }

/**
 * Add new student record
 * @param {*} req
 * @param {string} email
 * @returns {Promise<*>}
 */
studentsModel.addStudentRecord = async function (req, email) {
    if(isEmpty(email)) {
        return [];
    }
    const tableName = 'students';
    let student_id = generateId();
    let status = constant.STUDENTS.STATUS.ACTIVE;
    let sql = `INSERT INTO ${tableName} (student_id, email, status) VALUES (?, ?, ?)`;
    return await databasHelper.query(req, sql, [student_id, email, status]);
}

/**
 * Get list of common students by teacher emails
 * @param {*} req
 * @param {array} teacherEmails
 * @returns {Promise<*>}
 */
studentsModel.getCommonStudentsByTeacherEmails = async function (req, teacherEmails) {
    if(isEmpty(teacherEmails)) {
        return [];
    }
    let sql = `SELECT s.email AS student FROM teacher_student_relation tsr
                INNER JOIN students s ON tsr.student_fk = s.student_id
                INNER JOIN teachers t ON tsr.teacher_fk = t.teacher_id
                WHERE t.email IN (?)
                GROUP BY s.email;`;
    return await databasHelper.query(req, sql, [teacherEmails]);
}

/**
 * Update student status to suspended
 * @param {*} req
 * @param {string} studentEmail
 * @param {string} studentStatus
 * @returns {Promise<*>}
 */
studentsModel.updateStudentStatus = async function (req, studentEmail, studentStatus) {
    if(isEmpty(studentEmail) || isEmpty(studentStatus)) {
        return [];
    }
    let tableName = 'students';
    let sql = `UPDATE ${tableName} SET status = '${studentStatus}' WHERE email IN (?)`;
    return await databasHelper.query(req, sql, [studentEmail]);
}