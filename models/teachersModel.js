const teachersModel = module.exports;
// const databasHelper = require('../helpers/databaseHelper');
const generalHelper = require('../helpers/generalHelper');
const constant = require('../config/constant');
let { isEmpty, generateId } = generalHelper;
const ModelSchema = require('./model_schemas/index');
const Teachers = ModelSchema.Teachers;

/**
 * Get single teacher record by email
 * @param {*} req
 * @param {string} email
 * @returns {Promise<*>}
 */
teachersModel.getTeacherByEmail = async function(req, email) {
    if(isEmpty(email)) {
        return [];
    }
    let records = await Teachers.findAll({where: { email: email }});
    let getTeacher = records.length > 0 ? records[0] : {};
    return getTeacher.dataValues ? getTeacher.dataValues : getTeacher;
}

/**
 * Add new teacher record
 * @param {*} req
 * @param {string} email
 * @returns {Promise<*>}
 */
teachersModel.addTeacherRecord = async function(req, email) {
    if(isEmpty(email)) {
        return [];
    }
    let teacher_id = generateId();
    let status = constant.TEACHERS.STATUS.ACTIVE;
    let newTeacher = await Teachers.create({
        teacher_id: teacher_id,
        email: email,
        status: status
    });
    return newTeacher.dataValues ? newTeacher.dataValues : newTeacher;
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