/*
 Export models
*/
const Teachers = require('./Teachers');
const Students = require('./Students');
const TeacherStudentRelation = require('./TeacherStudentRelation');

/*
 Model relations
*/
Teachers.belongsToMany(Students, {through: TeacherStudentRelation, foreignKey: 'teacher_fk'});
Students.belongsToMany(Teachers, {through: TeacherStudentRelation, foreignKey: 'student_fk'});
TeacherStudentRelation.belongsTo(Students, {as: 'Students', foreignKey: 'student_fk'});
TeacherStudentRelation.belongsTo(Teachers, {as: 'Teachers', foreignKey: 'teacher_fk'});

module.exports = {
    Teachers: Teachers,
    Students: Students,
    TeacherStudentRelation: TeacherStudentRelation
};
