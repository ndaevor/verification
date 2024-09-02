const express = require('express');
const router = express.Router();

const panController = require('../controllers/pan/panController');

router.post('/verify-pan', panController.verifyPAN);

module.exports = router;
