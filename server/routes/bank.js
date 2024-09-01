const express = require('express');
const router = express.Router();

const bankController = require('../controllers/bank/bankController');

router.post('/verify-bank', bankController.verifyBank);
router.get('/verify-bank', bankController.verifyId);

module.exports = router;
