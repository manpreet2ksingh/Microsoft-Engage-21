const express = require('express');
const router = express.Router();

const {getStudentByID} = require('../controllers/student');
const {getTeacherByID} = require('../controllers/teacher');
const {analysis} = require('../controllers/Analysis');

router.post('/lecture/getAnalysis',analysis);

router.param("studentID",getStudentByID);
router.param('teacherID',getTeacherByID);

module.exports = router
