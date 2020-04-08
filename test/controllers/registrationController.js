const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
chai.use(chaiAsPromised);
const registrationController = require('../../controllers/registrationController');

describe('*** Registration Controller ***', () => {

    describe('Test >>> registrationController.registerNewUsers', () => {

        it('Test without teacher and students params >>> Expect return error thrown', async () => {
            const users = {};
            const req = '';
            await expect(registrationController.registerNewUsers(req, users)).to.be.rejected;
        });

        it('Test without students params >>> Expect return error thrown', async () => {
            const users = {
                teacher: 'teacherdelontoh@gmail.com'
            };
            const req = '';
            await expect(registrationController.registerNewUsers(req, users)).to.be.rejected;
        });

        it('Test without students params and empty teacher >>> Expect return error thrown', async () => {
            const users = {
                teacher: ''
            };
            const req = '';
            await expect(registrationController.registerNewUsers(req, users)).to.be.rejected;
        });

        it('Test without teacher params >>> Expect return error thrown', async () => {
            const users = {
                students: ['studentjon@example.com', 'studentrebecca@example.com']
            };
            const req = '';
            await expect(registrationController.registerNewUsers(req, users)).to.be.rejected;
        });

        it('Test without teacher param and empty students >>> Expect return error thrown', async () => {
            const users = {
                students: []
            };
            const req = '';
            await expect(registrationController.registerNewUsers(req, users)).to.be.rejected;
        });

        it('Test with existing teacher and student emails >>> Expect return undefined', async () => {
            const users = {
                teacher: 'teacherdelontoh@gmail.com',
                students: ['studentfranka@example.com', 'studentrebecca@example.com']
            };
            const req = '';
            let result = await registrationController.registerNewUsers(req, users);
            expect(result).to.be.undefined;
        });
    });

    describe('Test >>> registrationController._getTeacherAndStudentIds', () => {

        it('Test without teacher and student emails >>> Expect return empty object', async () => {
            const req = '';
            const teacherEmail = '';
            const studentEmails = [];
            let result = await registrationController._getTeacherAndStudentIds(req, teacherEmail, studentEmails);
            expect(result).to.be.an('object');
            expect(result).to.be.empty;
        });

        it('Test without teacher email >>> Expect return empty object', async () => {
            const req = '';
            const teacherEmail = '';
            const studentEmails = ['studentfranka@example.com', 'studentliskarm@example.com'];
            let result = await registrationController._getTeacherAndStudentIds(req, teacherEmail, studentEmails);
            expect(result).to.be.an('object');
            expect(result).to.be.empty;
        });

        it('Test without student emails >>> Expect return empty object', async () => {
            const req = '';
            const teacherEmail = 'teacherdelontoh@gmail.com';
            const studentEmails = [];
            let result = await registrationController._getTeacherAndStudentIds(req, teacherEmail, studentEmails);
            expect(result).to.be.an('object');
            expect(result).to.be.empty;
        });

        it('Test with teacher and student emails >>> Expect return object', async () => {
            const req = '';
            const teacherEmail = 'teacherdelontoh@gmail.com';
            const studentEmails = ['studentfranka@example.com', 'studentliskarm@example.com'];
            let result = await registrationController._getTeacherAndStudentIds(req, teacherEmail, studentEmails);
            expect(result).to.be.an('object');
            expect(result).to.not.be.empty;
            expect(result).to.have.property('teacherId');
            expect(result).to.have.property('studentIds');
            expect(result.studentIds).to.be.an('array');
        });
    });

    describe('Test >>> registrationController.createTeacherStudentsRelation', () => {

        it('Test without teacher and student emails >>> Expect return error thrown', async () => {
            const req = '';
            const teacherEmail = '';
            const studentEmails = [];
            await expect(registrationController.createTeacherStudentsRelation(req, teacherEmail, studentEmails)).to.be.rejected;
        });

        it('Test without teacher email >>> Expect return error thrown', async () => {
            const req = '';
            const teacherEmail = '';
            const studentEmails = ['studentfranka@example.com', 'studentliskarm@example.com'];
            await expect(registrationController.createTeacherStudentsRelation(req, teacherEmail, studentEmails)).to.be.rejected;
        });

        it('Test without student emails >>> Expect return error thrown', async () => {
            const req = '';
            const teacherEmail = 'teacherdelontoh@gmail.com';
            const studentEmails = [];
            await expect(registrationController.createTeacherStudentsRelation(req, teacherEmail, studentEmails)).to.be.rejected;
        });

        it('Test with teacher and student emails >>> Expect return array of undefined', async () => {
            const req = '';
            const teacherEmail = 'teacherdelontoh@gmail.com';
            const studentEmails = ['studentfranka@example.com', 'studentliskarm@example.com'];
            let result = await registrationController.createTeacherStudentsRelation(req, teacherEmail, studentEmails);
            expect(result).to.be.an('array');
        });
    });

    describe('Test >>> registrationController.createTeacherStudentsRelation', () => {

        it('Test without teacherId and studentId >>> Expect return error thrown', async () => {
            const req = '';
            const teacherId = '';
            const studentId = '';
            await expect(registrationController.getTeacherAndStudentRelation(req, teacherId, studentId)).to.be.rejected;
        });

        it('Test without studentId >>> Expect return error thrown', async () => {
            const req = '';
            const teacherId = 'a0e4ccaf-d00b-438d-a529-6bcc80ef32aa';
            const studentId = '';
            await expect(registrationController.getTeacherAndStudentRelation(req, teacherId, studentId)).to.be.rejected;
        });

        it('Test without teacherId >>> Expect return error thrown', async () => {
            const req = '';
            const teacherId = '';
            const studentId = 'e42eee20-a11f-435f-81d4-f40a2e855c34';
            await expect(registrationController.getTeacherAndStudentRelation(req, teacherId, studentId)).to.be.rejected;
        });

        // it('Test with teacherId and studentId>>> Expect return boolean true', async () => {
        //     const req = '';
        //     const teacherId = 'a0e4ccaf-d00b-438d-a529-6bcc80ef32aa';
        //     const studentId = 'e42eee20-a11f-435f-81d4-f40a2e855c34';
        //     let result = await registrationController.getTeacherAndStudentRelation(req, teacherId, studentId);
        //     expect(result).to.be.true;
        // });
    })


})