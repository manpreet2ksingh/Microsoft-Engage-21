const express = require('express');
const router = express.Router();

const {addTimeTable} = require('../controllers/timeTable')

router.post('/add',addTimeTable);

module.exports = router;
