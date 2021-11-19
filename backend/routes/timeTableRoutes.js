const express = require('express');
const router = express.Router();

const {addTimeTable,timetable, addTeacherTimeTable} = require('../controllers/timeTable')

router.post('/add',addTimeTable);
router.post('/teacher/add',addTeacherTimeTable);
router.get('/get/:batch',timetable);

module.exports = router;
