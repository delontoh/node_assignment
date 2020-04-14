const studentsController = module.exports;
const studentsModel = require('../models/studentsModel');
const generalHelper = require('../helpers/generalHelper');
let { isEmpty } = generalHelper;

/**
 * Add new students records
 * @param req
 * @param studentEmails
 * @returns {Promise<number[]>}
 */
studentsController.addNewStudents = async function (req, studentEmails) {
    const funcName = 'studentsController.addNewStudents';
    if(isEmpty(studentEmails)) {
        throw new Error(`${funcName}: student emails not found`);
    }
    // check if student record exist
    if(Array.isArray(studentEmails) && studentEmails.length > 0) {
        for(let i = 0; i < studentEmails.length; i++) {
            let email = studentEmails[i];
            let getStudent = await studentsController.getStudentByEmail(req, email);
            // create student record if no existing record
            if(isEmpty(getStudent)) {
                try {
                    await studentsController.addStudentRecord(req, email);
                } catch(err) {
                    console.log(`${funcName}: Failed to create new student record (Email: ${email})\n Error: ${err}`);
                }
            }
        }
    }
}

/**
 * Get single student record by email
 * @param {*} req
 * @param {string} email
 * @returns {Promise<*>}
 */
studentsController.getStudentByEmail = async function (req, email) {
    const funcName = 'studentsController.getStudentByEmail';
    if(!email) {
        throw new Error(`${funcName}: missing params 'email'`);
    }
    let student = await studentsModel.getStudentByEmail(req, email);
    return student;
}

/**
 * Get list of students by emails
 * @param {*} req
 * @param {array} emails
 * @returns {Promise<*>}
 */
studentsController.getStudentsByEmails = async function (req, emails) {
    const funcName = 'studentsController.getStudentsByEmails';
    if(!emails) {
        throw new Error(`${funcName}: missing params 'emails'`);
    }
    if(!Array.isArray(emails)) {
        throw new Error(`${funcName}: invalid emails type`);
    }
    if(isEmpty(emails)) {
        throw new Error(`${funcName}: empty params 'emails'`);
    }
    let students = emails.map(async (email) => {
        return await studentsModel.getStudentByEmail(req, email);
    });
    return await Promise.all(students);
}

/**
 * Get students data by teachers email
 * @param {*} req
 * @param {string} email
 * @returns {Promise<*>}
 */
studentsController.getStudentsDataByTeacherEmail = async function (req, email) {
    const funcName = 'studentsController.getStudentsDataByTeacherEmail';
    if(isEmpty(email)) {
        throw new Error(`${funcName}: missing params 'email'`);
    }
    let studentsData = await studentsModel.getStudentsDataByTeacherEmail(req, email);
    return studentsData;
}

/**
 * Add new student record
 * @param {*} req
 * @param {string} email
 * @returns {Promise<void>}
 */
studentsController.addStudentRecord = async function (req, email) {
    const funcName = 'studentsController.addStudentRecord';
    if(!email) {
        throw new Error(`${funcName}: missing param 'email'`);
    }
    let addStudent = await studentsModel.addStudentRecord(req, email);
    return addStudent;
}

/**
 * Get list of common students by teacher emails
 * @param {*} req
 * @param {*} teacherEmails
 * @returns {Promise<*>}
 */
studentsController.getCommonStudentsByTeacherEmails = async function (req, teacherEmails) {
    const funcName = 'studentsController.getCommonStudentsByTeacherEmails';
    if(!teacherEmails) {
        throw new Error(`${funcName}: missing param 'teacherEmails`);
    }
    if(Array.isArray(teacherEmails) && teacherEmails.length < 1) {
        throw new Error(`${funcName}: empty param array 'teacherEmails`);
    }
    let getCommonStudents;
    // check number of teacher emails provided
    if(Array.isArray(teacherEmails) && teacherEmails.length > 1) {
        // get all students given teacher emails
        let getAllStudents = await studentsModel.getCommonStudentsByTeacherEmails(req, teacherEmails);
        getCommonStudents = studentsController._checkDuplicateEmails(getAllStudents);
    } else {
        // get students from single teacher email
        getCommonStudents = await studentsModel.getCommonStudentsByTeacherEmail(req, teacherEmails);
    }
    // group student emails
    let commonStudentsList = studentsController._groupCommonStudentsByEmail(getCommonStudents);
    return commonStudentsList;
}

/**
 * Check and return student emails that have duplicates
 * @param getCommonStudents
 * @returns {Array}
 * @private
 */
studentsController._checkDuplicateEmails = function (getCommonStudents) {
    let occurance = {};
    let duplicates = [];
    for(let i = 0; i < getCommonStudents.length; i ++) {
        let getCommonStudent = getCommonStudents[i];
        let commonStudent = getCommonStudent.student;
        if(!isEmpty(commonStudent)) {
            if(!occurance[commonStudent]) {
                occurance[commonStudent] = commonStudent;
            } else {
                duplicates.push(getCommonStudent);
            }
        }
    }
    return duplicates;
}

/**
 * Sort student emails in array
 * @param {array.<object>} commonStudents
 * @returns {{students: Array}}
 * @private
 */
studentsController._groupCommonStudentsByEmail = function (commonStudents) {
    let common_students = {students: []};
    if(Array.isArray(commonStudents) && commonStudents.length > 0) {
        commonStudents.forEach((common_student) => {
            if(common_student.student && !isEmpty(common_student.student)) {
                let { students } = common_students;
                students.push(common_student.student);
            }
        })
    }
    return common_students;
}

/**
 * Update student status to suspended
 * @param {*} req
 * @param {string} studentEmail
 * @param {string} studentStatus
 * @returns {Promise<*>}
 */
studentsController.updateStudentStatus = async function (req, studentEmail, studentStatus) {
    const funcName = 'studentsController.updateStudentStatus';
    if(isEmpty(studentEmail)) {
        throw new Error(`${funcName}: missing param 'studentEmail'`);
    }
    if(isEmpty(studentStatus)) {
        throw new Error(`${funcName}: missing param 'studentStatus'`);
    }
    let updateStatus = await studentsModel.updateStudentStatus(req, studentEmail, studentStatus);
    return updateStatus;
}
