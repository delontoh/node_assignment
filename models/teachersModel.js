const teachersModel = module.exports;
// const databasHelper = require('../helpers/databaseHelper');
const Teachers = require('./model_schemas/Teachers');
const generalHelper = require('../helpers/generalHelper');
const constant = require('../config/constant');
let { isEmpty, generateId } = generalHelper;

/**
 * Get single teacher record by email
 * @param {*} req
 * @param {string} email
 * @returns {Promise<*>}
 */
teachersModel.getTeacherByEmail = async function(req, email) {
    const funcName = 'teachersModel.getTeacherByEmail';
    if(isEmpty(email)) {
        return [];
    }
    await Teachers.findAll({
        where: { email: email }
    }).then((records) => {
        let record = records[0];
        return record.dataValues;
    }).catch((err) => {
        console.log(`${funcName}: Failed to retrieve teacher record\n Error: ${err}`);
    })
}

/**
 * Add new teacher record
 * @param {*} req
 * @param {string} email
 * @returns {Promise<*>}
 */
teachersModel.addTeacherRecord = async function(req, email) {
    const funcName = 'teachersModel.addTeacherRecord';
    if(isEmpty(email)) {
        return [];
    }
    let teacher_id = generateId();
    let status = constant.TEACHERS.STATUS.ACTIVE;
    await Teachers.create({
        teacher_id: teacher_id,
        email: email,
        status: status
    }).then((newTeacher) => {
        return newTeacher.dataValues
    }).catch((err) => {
        console.log(`${funcName}: Failed to create new teacher record\n Error: ${err}`);
    })
}

/*
******************************* Non Sequelize Queries *******************************
 */

// /**
//  * Get single teacher record by email
//  * @param {*} req
//  * @param {string} email
//  * @returns {Promise<*>}
//  */
// teachersModel.getTeacherByEmail = async function(req, email) {
//     if(isEmpty(email)) {
//         return [];
//     }
//     const tableName = 'teachers';
//     let sql = `SELECT * FROM ${tableName} WHERE email IN (?)`;
//     let records = await databasHelper.query(req, sql, [email]);
//     return records[0];
// }

// /**
//  * Add new teacher record
//  * @param {*} req
//  * @param {string} email
//  * @returns {Promise<*>}
//  */
// teachersModel.addTeacherRecord = async function(req, email) {
//     if(isEmpty(email)) {
//         return [];
//     }
//     const tableName = 'teachers';
//     let teacher_id = generateId();
//     let status = constant.TEACHERS.STATUS.ACTIVE;
//     let sql = `INSERT INTO ${tableName} (teacher_id, email, status) VALUES (?, ?, ?)`;
//     return await databasHelper.query(req, sql, [teacher_id, email, status]);
// }