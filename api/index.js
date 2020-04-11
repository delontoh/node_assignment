const express = require('express');
const router = express.Router();
const studentsModel = require('../models/studentsModel');
// const registrationModel = require('../models/registrationModel')
/**
 * Default router home page
 */
// router.get('/', (req, res, next) => {
//     res.send('Node API');
// });

router.get('/', async (req, res, next) => {
    let teacher_id = 'f4f62986-cf9f-4bcc-9a54-e3ff9f98469c';
    let student_id = '4008d9ca-c411-4894-9281-0331058369ad'
    let email = 'teacherken@gmail.com';
    let status = 'suspended'
    // let result = await registrationModel.getTeacherAndStudentRelation(req, teacher_id, student_id);
    let result = await studentsModel.getStudentsDataByTeacherEmail(req, teacher_id)

    console.log('model result =>> ', result)
    res.send(result)
});

module.exports = router;