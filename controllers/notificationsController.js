const notificationsController = module.exports;
const studentsController = require('./studentsController');
// const notificationsModel = require('../models/notificationsModel');
const generalHelper = require('../helpers/generalHelper');
const constant = require('../config/constant');
let { isEmpty } = generalHelper;

/**
 * Get notification recipients by teacher email
 * @param {*} req
 * @param {string} teacherEmail
 * @returns {Promise<object>}
 */
notificationsController.getNotificationsByTeacherEmail = async function(req, teacherEmail) {
    const funcName = 'notificationsController.getNotificationsByTeacherEmail';
    if(isEmpty(teacherEmail)) {
        throw new Error(`${funcName}: missing param 'teacherEmail'`);
    }
    let result = {recipients: []};
    let getStudentList = await studentsController.getStudentsDataByTeacherEmail(req, teacherEmail);
    let getActiveStudents = notificationsController._getActiveStudents(getStudentList);
    result.recipients = getActiveStudents;
    return result;
}

/**
 * Get students with active status
 * @param {array} studentList
 * @returns {Array}
 * @private
 */
notificationsController._getActiveStudents = function (studentList) {
    const funcName = 'notificationsController._getActiveStudents';
    if(!studentList) {
        console.log(`${funcName}: missing param 'studentList'`);
        return [];
    }
    if(Array.isArray(studentList) && studentList.length < 1) {
        console.log(`${funcName}: studentList is empty`);
        return [];
    }
    let activeStudentsEmails = []
    studentList.filter((student) => {
        if(student.status && student.status === constant.STUDENTS.STATUS.ACTIVE) {
            let email = student.email || '';
            activeStudentsEmails.push(email);
        }
    })
    return activeStudentsEmails;
}

/**
 * Retrieve notification mentions and removes duplicates
 * @param {string} notification
 * @param {array} recipients
 * @returns {*{}}
 */
notificationsController.retrieveNotificationMentions = function (notification, recipients) {
    let splitStr = notification.split(' ');
    let mentions = [];
    let aggregated_recipients = {recipients: []};
    // check notifications for mentions
    splitStr.forEach((str) => {
        if(str.indexOf('.com') > -1) {
            if(str.indexOf('@') === 0) {
                mentions.push(str.slice(1));
            }
        }
    })
    // check if recipients list contains email that is already present in mentions
    if(mentions.length > 0) {
        let combinedList = mentions.concat(recipients);
        // remove email duplicates
        let set = new Set(combinedList);
        aggregated_recipients.recipients = Array.from(set);
    } else {
        aggregated_recipients.recipients = recipients;
    }
    return aggregated_recipients;
}