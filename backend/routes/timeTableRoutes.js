const express = require('express');
const router = express.Router();

const {addTimeTable,timetable, addTeacherTimeTable, teacherTimetable} = require('../controllers/timeTable')

router.post('/add',addTimeTable);
router.post('/teacher/add',addTeacherTimeTable);
router.get('/get/:batch',timetable);
router.get('/teacher/get/:ID',teacherTimetable)

module.exports = router;
