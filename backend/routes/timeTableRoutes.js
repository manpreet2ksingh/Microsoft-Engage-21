const express = require('express');
const router = express.Router();

const {addTimeTable,timetable} = require('../controllers/timeTable')

router.post('/add',addTimeTable);
router.get('/get/:batch',timetable);

module.exports = router;
