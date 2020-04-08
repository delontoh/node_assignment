const express = require('express');
const router = express.Router();
const generalHelper = require('../helpers/generalHelper');
let { isEmpty } = generalHelper;
const studentsController = require('../controllers/studentsController');

/**
 * @api {GET} /commonstudents/ Get common students by teachers emails
 */
router.get('/',
    async (req, res, next) => {
        let query = req.query;
        if(!query.teacher) {
            return res.status(500).json({
                status: 500,
                message: 'Invalid request'
            });
        }
        if(isEmpty(query.teacher)) {
            return res.status(500).json({
                status: 500,
                message: `Missing request param: 'teacher'`
            });
        }
        try {
            let teachers = query.teacher;
            let commonStudents = await studentsController.getCommonStudentsByTeacherEmails(req, teachers);
            if(commonStudents.students && !isEmpty(commonStudents.students)) {
                return res.status(200).json({
                    status: 200,
                    message: 'Successfully retrieved common students list',
                    data: commonStudents
                });
            } else {
                return res.status(500).json({
                    status: 500,
                    message: 'Common students list is empty',
                    data: []
                });
            }
        } catch(err) {
            if(err) {
                console.log(err)
                return res.status(500).json({
                    status: 500,
                    message: 'Failed to retrieve common students list'
                });
            }
        }
    });

module.exports = router;