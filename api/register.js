const express = require('express');
const router = express.Router();
const generalHelper = require('../helpers/generalHelper');
let { isEmpty } = generalHelper;
const registrationController = require('../controllers/registrationController');

/**
 * @api {POST} /register/ Register teacher and students
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
        if(!body.students) {
            return res.status(500).json({
                status: 500,
                message: `Missing request param: 'students'`
            });
        }
        try {
            await registrationController.registerNewUsers(req, body);
            return res.status(204).json({
                status: 204,
                message: 'Registration is successful'
            });
        } catch(err) {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    status: 500,
                    message: 'Registration failed'
                });
            }
        }
    });

module.exports = router;