const express = require('express');
const router = express.Router();

// Importing the routes
const form = require('./form');
const mail = require('./mail');
const mobile = require('./mobile');
const aadhar = require('./aadhar');
const pan = require('./pan');
const bank = require('./bank');
const gst = require('./gst');
const pincode = require('./pincode');

// Setting the routes
router.use('/form', form);
router.use('/mail', mail);
router.use('/mobile', mobile);
router.use('/aadhar', aadhar);
router.use('/pan', pan);
router.use('/bank', bank);
router.use('/gst', gst);
router.use('/pincode', pincode);

module.exports = router;
