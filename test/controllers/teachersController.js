const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
chai.use(chaiAsPromised);
const teachersController = require('../../controllers/teachersController');
const { generateId } = require('../../helpers/generalHelper');

describe('*** Teachers Controller ***', () => {

    describe('Test >>> teachersController.addNewTeacher', () => {

        it('Test without teacherEmail >>> Expect return error thrown', async () => {
            const req = '';
            const teacherEmail = '';
            await expect(teachersController.addNewTeacher(req, teacherEmail)).to.be.rejected;
        });

        it('Test with existing teacherEmail >>> Expect return undefined', async () => {
            const req = '';
            const teacherEmail = 'teacherdelontoh@gmail.com';
            let result = await teachersController.addNewTeacher(req, teacherEmail);
            expect(result).to.be.undefined;
        });

        it('Test with new teacherEmail >>> Expect return object', async () => {
            const req = '';
            const newId = generateId();
            const teacherEmail = `${newId}@gmail.com`;
            let result = await teachersController.addNewTeacher(req, teacherEmail);
            expect(result).to.be.an('object');
        });
    });

    describe('Test >>> teachersController.getTeacherByEmail', () => {

        it('Test without teacherEmail >>> Expect return error thrown', async () => {
            const req = '';
            const teacherEmail = '';
            await expect(teachersController.getTeacherByEmail(req, teacherEmail)).to.be.rejected;
        });

        it('Test with existing teacherEmail >>> Expect return teacher object', async () => {
            const req = '';
            const teacherEmail = 'teacherdelontoh@gmail.com';
            let result = await teachersController.getTeacherByEmail(req, teacherEmail);
            expect(result).to.be.an('object');
            expect(result).to.have.property('teacher_id');
            expect(result).to.have.property('email');
            expect(result).to.have.property('status');
            expect(result).to.have.property('created_by');
            expect(result).to.have.property('created_date');
            expect(result).to.have.property('updated_by');
            expect(result).to.have.property('updated_date');
        });

        it('Test with non existing teacherEmail >>> Expect return empty object', async () => {
            const req = '';
            const newId = generateId();
            const teacherEmail = `${newId}@teacher.com`;
            let result = await teachersController.getTeacherByEmail(req, teacherEmail);
            expect(result).to.be.an('object');
            expect(result).to.be.empty;
        });
    });

    describe('Test >>> teachersController.addTeacherRecord', () => {

        it('Test without teacherEmail >>> Expect return error thrown', async () => {
            const req = '';
            const teacherEmail = '';
            await expect(teachersController.addTeacherRecord(req, teacherEmail)).to.be.rejected;
        });

        it('Test with non existing teacherEmail >>> Expect return object', async () => {
            const req = '';
            const newId = generateId();
            const teacherEmail = `${newId}@gmail.com`;
            let result = await teachersController.addTeacherRecord(req, teacherEmail);
            expect(result).to.be.an('object');
        });
    });
})
