const registrationController = module.exports;
const registrationModel = require('../models/registrationModel');
const teachersController = require('../controllers/teachersController');
const studentsController = require('../controllers/studentsController');
const generalHelper = require('../helpers/generalHelper');
let { isEmpty, cmpBool } = generalHelper;

/**
 * Register new teacher and students
 * @param {*} req
 * @param {object} users
 * @returns {Promise<any[]>}
 */
registrationController.registerNewUsers = async function (req, users) {
    const funcName = 'registrationController.registerNewUsers';
    if(!users) {
        throw new Error(`${funcName}: missing users data`);
    }
    if(!users.teacher) {
        throw new Error(`${funcName}: missing teachers email`);
    }
    if(!users.students) {
        throw new Error(`${funcName}: missing students email`);
    }
    let {teacher, students} = users;
    if(typeof teacher === 'string' && Array.isArray(students)) {
        await teachersController.addNewTeacher(req, teacher);
        await studentsController.addNewStudents(req, students);
        await registrationController.createTeacherStudentsRelation(req, teacher, students);
    }
}

/**
 * Get teacher and student ids
 * @param {*} req
 * @param {string} teacherEmail
 * @param {array} studentEmails
 * @returns {Promise<object>}
 */
registrationController._getTeacherAndStudentIds = async function (req, teacherEmail, studentEmails) {
    if(isEmpty(teacherEmail)) {
        return {};
    }
    if(isEmpty(studentEmails)) {
        return {};
    }
    let teacher = await teachersController.getTeacherByEmail(req, teacherEmail);
    let students = await studentsController.getStudentsByEmails(req, studentEmails);
    let teacherId = (teacher && teacher.teacher_id) ? teacher.teacher_id : '';
    let studentIds = [];
    students.forEach((student) => {
        let student_id = (student && student.student_id) ? student.student_id : '';
        studentIds.push(student_id);
    })
    return {teacherId, studentIds};
}

/**
 * Create teacher and students relation records
 * @param {*} req
 * @param {string} teacherEmail
 * @param {array} studentEmails
 * @returns {Promise<*>}
 */
registrationController.createTeacherStudentsRelation = async function (req, teacherEmail, studentEmails) {
    const funcName = 'registrationController.createTeacherStudentsRelation';
    // retrieve teacher and student ids
    let getIds = await registrationController._getTeacherAndStudentIds(req, teacherEmail, studentEmails);

    if(isEmpty(getIds)) {
        throw new Error(`${funcName}: Failed to retrieve teacher and student ids`);
    }
    if(!getIds.teacherId) {
        throw new Error(`${funcName}: missing params 'teacherId`);
    }
    if(!getIds.studentIds) {
        throw new Error(`${funcName}: missing params 'studentIds'`);
    }
    let allNewRelations = [];
    // create all teacher and student relation record
    if(Array.isArray(getIds.studentIds) && !isEmpty(getIds.studentIds)) {
        for(let i = 0; i < getIds.studentIds.length; i++) {
            let student_id = getIds.studentIds[i];
            let {teacherId} = getIds;
            let isExistingRelation;
            // check if teacher student relation already exist; returns boolean
            try {
                isExistingRelation = await registrationController.getTeacherAndStudentRelation(req, teacherId, student_id);
            } catch (err) {
                console.log(`${funcName}: Failed to retrieve teacher student relation record\n Error: ${err}`);
            }
            // create record only if there is no existing one
            if(cmpBool(isExistingRelation, false)) {
                try {
                    let newRelation = await registrationModel.createTeacherStudentsRelation(req, student_id, teacherId);
                    allNewRelations.push(newRelation);
                } catch(err) {
                    console.log(`${funcName}: Failed to create relation record (teacher_id: ${teacherId}, student_id: ${student_id})\n Error: ${err}`);
                }
            }
        }
    }
    return allNewRelations;
}

/**
 * Get teacher and student relation record by their ids
 * @param {*} req
 * @param {string} teacherId
 * @param {string} studentId
 * @returns {Promise<boolean>} Returns true if record is found
 */
registrationController.getTeacherAndStudentRelation = async function (req, teacherId, studentId) {
    const funcName = 'registrationController.getTeacherAndStudentRelation';
    if(!teacherId) {
        throw new Error(`${funcName}: missing params 'teacherId`);
    }
    if(!studentId) {
        throw new Error(`${funcName}: missing params 'studentId'`);
    }
    return await registrationModel.getTeacherAndStudentRelation(req, teacherId, studentId);
}