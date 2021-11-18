const express = require('express');
const router = express.Router();

const {BookSlot,sample} = require('../controllers/test')
const {cache} = require('../controllers/cache')

router.post('/book',cache,BookSlot)
router.post('/sample',sample)

module.exports = router
