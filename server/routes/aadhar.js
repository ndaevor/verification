const express = require('express');
const router = express.Router();

const aadharController = require('../controllers/aadhar/aadharController');

router.post('/verify-aadhar', aadharController.verifyAadhar);

module.exports = router;
