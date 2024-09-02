const express = require('express');
const router = express.Router();

const formController = require('../controllers/form/formController');

router.post('/submit-form', formController.submitForm);

module.exports = router;
