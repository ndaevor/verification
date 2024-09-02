const express = require('express');
const router = express.Router();

// Importing the controllers 
const mailController = require('../controllers/mail/mailController');

// setting the controllers for each routes 
router.post('/send-otp', mailController.sendOTP);
router.post('/verify-otp', mailController.verifyOTP);

module.exports = router;
