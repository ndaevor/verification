const express = require('express');
const router = express.Router();

const pincodeController = require('../controllers/pincode/pincodeController');

router.get('/get-address', pincodeController.getAddress);

module.exports = router;
