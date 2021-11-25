const express = require('express');
const router = express.Router();

const { updateVaccinationStatus} = require('../controllers/student')

router.post('/updateVaccinationStatus',updateVaccinationStatus);

module.exports = router
