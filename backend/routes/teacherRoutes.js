const express = require('express');
const router = express.Router();

const { getTeacherByID,
        saveTeacherPreference,
        updateTeacherPreference,
        getTeacherLectureStatus} = require('../controllers/teacher')

router.post('/setPreference',saveTeacherPreference);
router.post('/updatePreference',updateTeacherPreference);
router.post('/getLectureStatus',getTeacherLectureStatus)

router.param('teacherID',getTeacherByID);

module.exports = router
