const studentsModel = module.exports;
// const databasHelper = require('../helpers/databaseHelper');
const generalHelper = require('../helpers/generalHelper');
const constant = require('../config/constant');
let { isEmpty, generateId } = generalHelper;

const db = require('../config/db');
const ModelSchema = require('./model_schemas/index');
const Teachers = ModelSchema.Teachers;
const Students = ModelSchema.Students;
const TeacherStudentRelation = ModelSchema.TeacherStudentRelation;
const { QueryTypes } = require('sequelize');

/**
 * Get single student record by email
 * @param {*} req
 * @param {string} email
 * @returns {Promise<*>}
 */
studentsModel.getStudentByEmail = async function (req, email) {
    if(isEmpty(email)) {
        return [];
    }
    let records = await Students.findAll({
        where: { email: email }
    });
    let getStudent = records.length > 0 ? records[0] : {};
    return getStudent.dataValues ? getStudent.dataValues : getStudent;
}

/**
 * Get students email and status by teacher email
 * @param {*} req
 * @param {string} email
 * @returns {Promise<*>}
 */
studentsModel.getStudentsDataByTeacherEmail = async function (req, email) {
    if(!email) {
        return [];
    }
    // let records = await Students.findAll({
    //     where: {email: email},
    //     include: {
    //         model: [Teachers, TeacherStudentRelation]
    //     },
    //     attributes: ['email'],
    //     group: 'email'
    // })
    let records = await db.query(
        `SELECT s.email AS email, s.status AS status FROM teacher_student_relation tsr
         INNER JOIN students s ON tsr.student_fk = s.student_id
         INNER JOIN teachers t ON tsr.teacher_fk = t.teacher_id
         WHERE t.email IN ('${email}')
         GROUP BY s.email;`,
        { type: QueryTypes.SELECT });
    return records;
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
    let formatEmails;
    //Formats emails for query
    if(Array.isArray(teacherEmails) && teacherEmails.length > 0) {
        formatEmails =  "'" + teacherEmails.join("','") + "'";
    } else {
        formatEmails = "'" + teacherEmails + "'";
    }
    let records = await db.query(
        `SELECT s.email AS student FROM teacher_student_relation tsr
                INNER JOIN students s ON tsr.student_fk = s.student_id
                INNER JOIN teachers t ON tsr.teacher_fk = t.teacher_id
                WHERE t.email IN (${formatEmails})
                GROUP BY s.email;`,
        { type: QueryTypes.SELECT });
    return records;
}

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
    let student_id = generateId();
    let status = constant.STUDENTS.STATUS.ACTIVE;
    let newStudent = await Students.create({
        student_id: student_id,
        email: email,
        status: status
    });
    return newStudent.dataValues ? newStudent.dataValues : newStudent;
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
    return await Students.update({status: studentStatus}, {where: {email: studentEmail}});
}

/*
******************************* Non Sequelize Queries *******************************
 */

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

// /**
//  * Add new student record
//  * @param {*} req
//  * @param {string} email
//  * @returns {Promise<*>}
//  */
// studentsModel.addStudentRecord = async function (req, email) {
//     if(isEmpty(email)) {
//         return [];
//     }
//     const tableName = 'students';
//     let student_id = generateId();
//     let status = constant.STUDENTS.STATUS.ACTIVE;
//     let sql = `INSERT INTO ${tableName} (student_id, email, status) VALUES (?, ?, ?)`;
//     return await databasHelper.query(req, sql, [student_id, email, status]);
// }

// /**
//  * Get list of common students by teacher emails
//  * @param {*} req
//  * @param {array} teacherEmails
//  * @returns {Promise<*>}
//  */
// studentsModel.getCommonStudentsByTeacherEmails = async function (req, teacherEmails) {
//     if(isEmpty(teacherEmails)) {
//         return [];
//     }
//     let sql = `SELECT s.email AS student FROM teacher_student_relation tsr
//                 INNER JOIN students s ON tsr.student_fk = s.student_id
//                 INNER JOIN teachers t ON tsr.teacher_fk = t.teacher_id
//                 WHERE t.email IN (?)
//                 GROUP BY s.email;`;
//     return await databasHelper.query(req, sql, [teacherEmails]);
// }

// /**
//  * Update student status to suspended
//  * @param {*} req
//  * @param {string} studentEmail
//  * @param {string} studentStatus
//  * @returns {Promise<*>}
//  */
// studentsModel.updateStudentStatus = async function (req, studentEmail, studentStatus) {
//     if(isEmpty(studentEmail) || isEmpty(studentStatus)) {
//         return [];
//     }
//     let tableName = 'students';
//     let sql = `UPDATE ${tableName} SET status = '${studentStatus}' WHERE email IN (?)`;
//     return await databasHelper.query(req, sql, [studentEmail]);
// }