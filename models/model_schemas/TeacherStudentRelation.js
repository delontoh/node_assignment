const Sequelize = require('sequelize');
const db = require('../../config/db');
const Teachers = require('./Teachers');
const Students = require('./Students');

/*
 Table schema => 'teacher_student_relation'
*/
const TeacherStudentRelation = db.define('teacher_student_relation', {
    teacher_student_relation_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    student_fk: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
        references: {
            model: Students,
            key: 'student_id'
        }
    },
    teacher_fk: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
        references: {
            model: Teachers,
            key: 'teacher_id'
        }
    },
    created_by: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
    },
    updated_by: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
    }
}, {
    createdAt: 'created_date',
    updatedAt: 'updated_date',
    freezeTableName: true
});

/*
 Table association
 */
// Teachers.belongsToMany(Students, {through: TeacherStudentRelation, foreignKey: 'teacher_fk'});
// Students.belongsToMany(Teachers, {through: TeacherStudentRelation, foreignKey: 'student_fk'});

module.exports = TeacherStudentRelation;