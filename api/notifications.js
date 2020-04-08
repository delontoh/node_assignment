const express = require('express');
const router = express.Router();
const generalHelper = require('../helpers/generalHelper');
let { isEmpty } = generalHelper;
const notificationsController = require('../controllers/notificationsController');

/**
 * @api {POST} /retrievefornotifications/ Retrieve notifications by teacher email
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
        if(!body.teacher) {
            return res.status(500).json({
                status: 500,
                message: `Missing request param: 'teacher'`
            });
        }
        if(!body.notification) {
            return res.status(500).json({
                status: 500,
                message: `Missing request param: 'notification'`
            });
        }
        try {
            let teacherEmail = body.teacher;
            let notification = body.notification;
            // get active students assigned to teacher
            let activeRecipients = await notificationsController.getNotificationsByTeacherEmail(req, teacherEmail);
            // get students that are mentioned and aggregate them with active students
            let aggregated_recipients = notificationsController.retrieveNotificationMentions(notification, activeRecipients.recipients);
            // return aggregated_recipients list even when empty
            return res.status(200).json({
                status: 200,
                message: 'Successfully retrieve notification recipients list',
                data: aggregated_recipients
            });
        } catch(err) {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    status: 500,
                    message: 'Failed to retrieve notification recipients list'
                });
            }
        }
    });

module.exports = router;