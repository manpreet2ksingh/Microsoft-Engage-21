const express = require('express');
const router = express.Router();

const {responseToTeacher,getTeacherByID} = require('../controllers/teacher')

router.post('/:teacherID/setPreference',responseToTeacher);

router.param('teacherID',getTeacherByID);

module.exports = router
