const express = require('express');
const router = express.Router();
const generalHelper = require('../helpers/generalHelper');
let { isEmpty } = generalHelper;
const constant = require('../config/constant');
const studentsController = require('../controllers/studentsController');

/**
 * @api {POST} /suspend/ Update student status to suspended
 */
router.post('/',
    async (req, res, next) => {
        let body = req.body;
        if(isEmpty(body)) {
            return res.status(500).json({
                status: 500,
                message: 'Invalid JSON request'
            });
        }
        if(!body.student) {
            return res.status(500).json({
                status: 500,
                message: `Missing request param: 'student'`
            });
        }
        try {
            let studentEmail = body.student;
            let studentStatus = constant.STUDENTS.STATUS.SUSPENDED;
            await studentsController.updateStudentStatus(req, studentEmail, studentStatus);
            return res.status(204).json({
                status: 204,
                message: 'Successfully update student status',
            });
        } catch(err) {
            if(err) {
                console.log(err)
                return res.status(500).json({
                    status: 500,
                    message: 'Failed to update student status'
                });
            }
        }
    });

module.exports = router;