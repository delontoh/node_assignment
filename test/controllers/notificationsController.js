const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
chai.use(chaiAsPromised);
const notificationsController = require('../../controllers/notificationsController');
const constant = require('../../config/constant');

describe('*** Notifications Controller ***', () => {

    describe('Test >>> notificationsController.getNotificationsByTeacherEmail', () => {

        it('Test without teacher email param >>> Expect error thrown', async () => {
            const teacherEmail = ''
            const req = '';
            await expect(notificationsController.getNotificationsByTeacherEmail(req, teacherEmail)).to.be.rejected
        });

        it('Test with teacher email param >>> Expect return result', async () => {
            const teacherEmail = 'teacherdelontoh@gmail.com'
            const req = '';
            let result = await notificationsController.getNotificationsByTeacherEmail(req, teacherEmail);
            expect(result).to.be.an('object');
            expect(result).to.have.property('recipients');
            expect(result.recipients).to.be.an('array');
            expect(result.recipients).to.not.be.empty;
        });
    });

    describe('Test >>> notificationsController._getActiveStudents', () => {

        it('Test without studentList arugment >>> Expect return empty array', ()=> {
            const studentList = undefined;
            let result = notificationsController._getActiveStudents(studentList);
            expect(result).to.be.an('array');
            expect(result).to.be.empty;
        });

        it('Test with empty studentList >>> Expect return empty array', ()=> {
            const studentList = [];
            let result = notificationsController._getActiveStudents(studentList);
            expect(result).to.be.an('array');
            expect(result).to.be.empty;
        });

        it('Test with studentList with no active student >>> Expect return empty array', ()=> {
            const studentList = [
                {email: 'studentrebecca@example.com', status: constant.STUDENTS.STATUS.SUSPENDED},
                {email: 'studenthon@example.com', status: constant.STUDENTS.STATUS.SUSPENDED},
                {email: 'studentjon@example.com', status: constant.STUDENTS.STATUS.INACTIVE}
            ];
            let result = notificationsController._getActiveStudents(studentList);
            expect(result).to.be.an('array');
            expect(result).to.be.empty;
        });

        it('Test with studentList with single active student >>> Expect return array of length 1', ()=> {
            const studentList = [
                {email: 'studentrebecca@example.com', status: constant.STUDENTS.STATUS.ACTIVE},
                {email: 'studenthon@example.com', status: constant.STUDENTS.STATUS.SUSPENDED},
                {email: 'studentjon@example.com', status: constant.STUDENTS.STATUS.INACTIVE}
            ];
            let result = notificationsController._getActiveStudents(studentList);
            expect(result).to.be.an('array');
            expect(result).to.have.length(1);
        });
    })

    describe('Test >>> notificationsController.retrieveNotificationMentions', () => {

        it('Test with empty arguments >>> Expect return object with empty array', () => {
            const notifications = '';
            const recipients = [];
            let result = notificationsController.retrieveNotificationMentions(notifications, recipients);
            expect(result).to.be.an('object');
            expect(result).to.have.property('recipients');
            expect(result.recipients).to.be.an('array');
            expect(result.recipients).to.be.empty;
        });

        it('Test with empty notifications and single recipient >>> Expect return object with 1 recipient', () => {
            const notifications = '';
            const recipients = ['studentjon@example.com'];
            let result = notificationsController.retrieveNotificationMentions(notifications, recipients);
            expect(result).to.be.an('object');
            expect(result).to.have.property('recipients');
            expect(result.recipients).to.be.an('array');
            expect(result.recipients).to.have.length(1);
        });

        it('Test with empty recipients and no mentions >>> Expect return object with empty array', () => {
            const notifications = 'Hello there!';
            const recipients = [];
            let result = notificationsController.retrieveNotificationMentions(notifications, recipients);
            expect(result).to.be.an('object');
            expect(result).to.have.property('recipients');
            expect(result.recipients).to.be.an('array');
            expect(result.recipients).to.be.empty;
        });

        it('Test with empty recipients and 1 mention >>> Expect return object with 1 recipient', () => {
            const notifications = 'Hello there! @studentmary@example.com';
            const recipients = [];
            let result = notificationsController.retrieveNotificationMentions(notifications, recipients);
            expect(result).to.be.an('object');
            expect(result).to.have.property('recipients');
            expect(result.recipients).to.be.an('array');
            expect(result.recipients).to.have.length(1);
        });

    })
})