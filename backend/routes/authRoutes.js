const express = require('express');
const router = express.Router();

const {registerUser,authenticateUser} = require('../controllers/authControllers')

router.post('/signup',registerUser);
router.post('/signin',authenticateUser);

module.exports = router
