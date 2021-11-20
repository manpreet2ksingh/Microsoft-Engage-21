const express = require('express');
const router = express.Router();

const {responseToTeacher,getTeacherByID,saveTeacherPreference,updateTeacherPreference} = require('../controllers/teacher')

router.post('/Preference',responseToTeacher);
router.post('/setPreference',saveTeacherPreference);
router.post('/updatePreference',updateTeacherPreference);

router.param('teacherID',getTeacherByID);

module.exports = router
