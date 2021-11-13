const express = require('express');
const router = express.Router();

const {BookSlot} = require('../controllers/test')

router.post('/book',BookSlot)

module.exports = router
