const express = require('express');
const router = express.Router();

const gstController = require('../controllers/gst/gstController');

router.post('/verify-gst', gstController.verifyGst);

module.exports = router;
