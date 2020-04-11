const Sequelize = require('sequelize');
const db = require('../../config/db');
const Students = require('./Students');
const TeacherStudentRelation = require('./TeacherStudentRelation');

/*
 Table schema => 'teachers'
*/
const Teachers = db.define('teacher', {
    teacher_id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
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
    },

}, {
    createdAt: 'created_date',
    updatedAt: 'updated_date'
});

/*
 Table association
 */
// Teachers.belongsToMany(Students, {through: TeacherStudentRelation, foreignKey: 'teacher_fk'});

module.exports = Teachers;