const Sequelize = require('sequelize');
const db = require('../../config/db');
const Teachers = require('./Teachers');
const TeacherStudentRelation = require('./TeacherStudentRelation');

/*
 Table schema => 'students'
*/
const Students = db.define('student', {
    student_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
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
    }
}, {
    createdAt: 'created_date',
    updatedAt: 'updated_date'
});

/*
 Table association
 */
// Students.associate = (models) => {
//     Students.belongsToMany(Teachers, {through: TeacherStudentRelation, foreignKey: 'student_fk'});
// }

module.exports = Students;