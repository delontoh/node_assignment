const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
chai.use(chaiAsPromised);
const studentsController = require('../../controllers/studentsController');
const { generateId, isEmpty } = require('../../helpers/generalHelper');
const constants = require('../../config/constant');

describe('*** Students Controller ***', () => {

    describe('Test >>> studentsController.addNewStudents', () => {

        it('Test without studentEmails >>> Expect return error thrown', async () => {
            const req = '';
            const studentEmails = [];
            await expect(studentsController.addNewStudents(req, studentEmails)).to.be.rejected;
        });

        it('Test with existing studentEmails >>> Expect return empty array', async () => {
            const req = '';
            const studentEmails = ['studentrebecca@example.com'];
            let result = await studentsController.addNewStudents(req, studentEmails);
            expect(result).to.be.an('array');
            expect(result).to.be.empty;
        });

        it('Test with new studentEmails >>> Expect return array of length 2', async () => {
            const req = '';
            const newId = generateId();
            const studentEmails = [`${newId}.student.com`, `${newId}.newstudent.com`];
            let result = await studentsController.addNewStudents(req, studentEmails);
            expect(result).to.be.an('array');
            expect(result).to.have.length(studentEmails.length);
        });
    });

    describe('Test >>> studentsController.addStudentRecord', () => {

        it('Test without studentEmail >>> Expect return error thrown', async () => {
            const req = '';
            const studentEmail = '';
            await expect(studentsController.addStudentRecord(req, studentEmail)).to.be.rejected;
        });

        it('Test with non existing studentEmail >>> Expect return object', async () => {
            const req = '';
            const newId = generateId();
            const studentEmail = `${newId}@student.com`;
            let result = await studentsController.addStudentRecord(req, studentEmail);
            expect(result).to.be.an('object');
        });
    });

    describe('Test >>> studentsController.getStudentByEmail', () => {

        it('Test without student email >>> Expect return error thrown', async () => {
            const req = '';
            const studentEmail = '';
            await expect(studentsController.getStudentByEmail(req, studentEmail)).to.be.rejected;
        });

        it('Test with existing student email >>> Expect return student object', async () => {
            const req = '';
            const studentEmail = 'studentrebecca@example.com';
            let result = await studentsController.getStudentByEmail(req, studentEmail);
            expect(result).to.be.an('object');
            expect(result).to.have.property('student_id');
            expect(result).to.have.property('email');
            expect(result).to.have.property('status');
            expect(result).to.have.property('created_by');
            expect(result).to.have.property('created_date');
            expect(result).to.have.property('updated_by');
            expect(result).to.have.property('updated_date');
        });

        it('Test with non existing studentEmail >>> Expect return empty object', async () => {
            const req = '';
            const newId = generateId();
            const studentEmail = `${newId}@student.com`;
            let result = await studentsController.getStudentByEmail(req, studentEmail);
            expect(result).to.be.an('object');
            expect(result).to.be.empty;
        });
    });

    describe('Test >>> studentsController.getStudentsByEmails', () => {

        it('Test without array of student emails >>> Expect return error thrown', async () => {
            const req = '';
            const studentEmails = [];
            await expect(studentsController.getStudentsByEmails(req, studentEmails)).to.be.rejected;
        });

        it('Test with existing student emails >>> Expect return student object', async () => {
            const req = '';
            const studentEmails = ['studentrebecca@example.com', 'studentjon@example.com'];
            let result = await studentsController.getStudentsByEmails(req, studentEmails);
            expect(result).to.be.an('array');
            expect(result).to.have.length(studentEmails.length);
        });

        it('Test with existing and non existing studentEmails >>> Expect return array with one undefined element', async () => {
            const req = '';
            const newId = generateId();
            const studentEmails = [`${newId}@student.com`, 'studentrebecca@example.com'];
            let result = await studentsController.getStudentsByEmails(req, studentEmails);
            let filteredResult = result.filter((studentEmails) => {
                if(isEmpty(studentEmails)) {
                    return studentEmails;
                };
            })
            expect(result).to.be.an('array');
            expect(result).to.have.length(studentEmails.length);
            expect(filteredResult).to.have.length(1);
        });
    });

    describe('Test >>> studentsController.getStudentsDataByTeacherEmail', () => {

        it('Test with empty teacher email >>> Expect return error thrown', async () => {
            const req = '';
            const teacherEmail = '';
            await expect(studentsController.getStudentsDataByTeacherEmail(req, teacherEmail)).to.be.rejected;
        });

        it('Test with student email  >>> Expect return empty array', async () => {
            const req = '';
            const teacherEmail = 'studentrebecca@example.com';
            let results = await studentsController.getStudentsDataByTeacherEmail(req, teacherEmail);
            expect(results).to.be.an('array');
            expect(results).to.be.empty;
        });

        it('Test with teacher email  >>> Expect return array of objects', async () => {
            const req = '';
            const teacherEmail = 'teacherdelontoh@gmail.com';
            let results = await studentsController.getStudentsDataByTeacherEmail(req, teacherEmail);
            results.forEach((result) => {
                expect(result).to.be.an('object');
                expect(result).to.have.property('email');
                expect(result).to.have.property('status');
            })
            expect(results).to.be.an('array');
        });
    });

    describe('Test >>> studentsController.getCommonStudentsByTeacherEmails', () => {

        it('Test with empty teacher emails array >>> Expect return error thrown', async () => {
            const req = '';
            const teacherEmails = [];
            await expect(studentsController.getCommonStudentsByTeacherEmails(req, teacherEmails)).to.be.rejected;
        });

        it('Test with empty teacher emails param >>> Expect return error thrown', async () => {
            const req = '';
            const teacherEmails = '';
            await expect(studentsController.getCommonStudentsByTeacherEmails(req, teacherEmails)).to.be.rejected;
        });

        it('Test with one empty teacher email >>> Expect return object with students property', async () => {
            const req = '';
            const teacherEmails = ['teacherdelontoh@gmail.com', ''];
            let results = await studentsController.getCommonStudentsByTeacherEmails(req, teacherEmails);
            expect(results).to.be.an('object');
            expect(results).to.have.property('students');
            expect(results.students).to.be.an('array');
        });

        it('Test with existing teacher emails >>> Expect return object with students property', async () => {
            const req = '';
            const teacherEmails = ['teacherken@gmail.com', 'teacherdelontoh@gmail.com'];
            let results = await studentsController.getCommonStudentsByTeacherEmails(req, teacherEmails);
            expect(results).to.be.an('object');
            expect(results).to.have.property('students');
            expect(results.students).to.be.an('array');
            expect(results.students).to.not.be.empty;
        });
    });

    describe('Test >>> studentsController._groupCommonStudentsByEmail', () => {

        it('Test with empty array >>> Expect return object with empty array', () => {
            const commonStudents = [];
            let results = studentsController._groupCommonStudentsByEmail(commonStudents);
            expect(results).to.be.an('object');
            expect(results).to.have.property('students');
            expect(results.students).to.be.empty;
        });

        it('Test with single student object >>> Expect return object array length 1', () => {
            const commonStudents = [
                {student: 'studentrebecca@example.com'},
                {student: ''},
            ];
            let results = studentsController._groupCommonStudentsByEmail(commonStudents);
            expect(results).to.be.an('object');
            expect(results).to.have.property('students');
            expect(results.students).to.have.length(1);
        });

        it('Test with two student objects >>> Expect return object with array length 2', () => {
            const commonStudents = [
                {student: 'studentrebecca@example.com'},
                {student: 'studentfranka@example.com'},
            ];
            let results = studentsController._groupCommonStudentsByEmail(commonStudents);
            expect(results).to.be.an('object');
            expect(results).to.have.property('students');
            expect(results.students).to.have.length(2);
        });
    });

    describe('Test >>> studentsController.updateStudentStatus', () => {

        it('Test without studentEmail and studentStatus params >>> Expect return error thrown', async () => {
            const req = '';
            const studentEmail = '';
            const studentStatus = '';
            await expect(studentsController.updateStudentStatus(req, studentEmail, studentStatus)).to.be.rejected;
        });

        it('Test without studentEmail param >>> Expect return error thrown', async () => {
            const req = '';
            const studentEmail = '';
            const studentStatus = constants.STUDENTS.STATUS.SUSPENDED;
            await expect(studentsController.updateStudentStatus(req, studentEmail, studentStatus)).to.be.rejected;
        });

        it('Test without studentStatus param >>> Expect return error thrown', async () => {
            const req = '';
            const studentEmail = 'studentrebecca@gmail.com';
            const studentStatus = '';
            await expect(studentsController.updateStudentStatus(req, studentEmail, studentStatus)).to.be.rejected;
        });

        it('Test with both studentEmail and studentStatus param >>> Expect return object', async () => {
            const req = '';
            const studentEmail = 'studentrebecca@gmail.com';
            const studentStatus = constants.STUDENTS.STATUS.SUSPENDED;
            let results = await studentsController.updateStudentStatus(req, studentEmail, studentStatus);
            expect(results).to.be.an('array');
        });
    });

})
