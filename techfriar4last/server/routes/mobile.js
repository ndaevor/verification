const express = require('express');
const router = express.Router();


const mobileController = require('../controllers/mobile/mobileController');

router.post('/send-otp', mobileController.sendOTP);
router.post('/verify-otp', mobileController.verifyOTP);

module.exports = router;