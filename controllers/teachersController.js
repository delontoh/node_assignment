const teachersController = module.exports;
const teachersModel = require('../models/teachersModel');
const generalHelper = require('../helpers/generalHelper');
let { isEmpty } = generalHelper;

/**
 * Add new teacher record
 * @param {*} req
 * @param {string} teacherEmail
 * @param {string[]} studentEmails
 * @returns {Promise<void>}
 */
teachersController.addNewTeacher = async function (req, teacherEmail) {
    const funcName = 'teachersController.addNewTeacher';
    if(isEmpty(teacherEmail)) {
        throw new Error(`${funcName}: teacher email not found`);
    }
    // check if teacher record exist
    if(typeof teacherEmail === 'string') {
        let getTeacher = await teachersController.getTeacherByEmail(req, teacherEmail);
        // create teacher record if it does not exist
        if(isEmpty(getTeacher)) {
            return await teachersController.addTeacherRecord(req, teacherEmail);
        }
    }
}

/**
 * Get single teacher record by email
 * @param {*} req
 * @param {string} email
 * @returns {Promise<*>}
 */
teachersController.getTeacherByEmail = async function (req, email) {
    const funcName = 'teachersController.getTeacherByEmail';
    if(!email) {
        throw new Error(`${funcName}: missing params 'email'`);
    }
    let teacher = await teachersModel.getTeacherByEmail(req, email);
    return teacher;
}

/**
 * Add new teacher record
 * @param {*} req
 * @param {string} email
 * @returns {Promise<void>}
 */
teachersController.addTeacherRecord = async function (req, email) {
    const funcName = 'teachersController.addTeacherRecord';
    if(!email) {
        throw new Error(`${funcName}: missing param 'email'`);
    }
    let addTeacher = await teachersModel.addTeacherRecord(req, email);
    return addTeacher;
}