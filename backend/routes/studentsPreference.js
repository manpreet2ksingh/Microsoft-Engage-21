const express = require('express');
const router = express.Router();

const {getStudentByID} = require('../controllers/student');
const {getTeacherByID} = require('../controllers/teacher');
const {analysis} = require('../controllers/studentsPreference');

router.post('/:teacherID/lecture/getAnalysis',analysis);

router.param("studentID",getStudentByID);
router.param('teacherID',getTeacherByID);

module.exports = router
