const mailer = require('../../utils/mailer');
const crypto = require('crypto');
const User = require('../../db/models/userSchema');

let otpStore = {}; // In-memory store for OTPs

// Route to send OTP
exports.sendOTP = async (req, res, next) => {
  const { email } = req.body;
  const otp = crypto.randomInt(100000, 999999).toString();
  otpStore[email] = otp; // Store the OTP

  try {
    await mailer.sendEmail(email, otp);
    res.status(200).send('OTP sent successfully');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error sending OTP');
  }
};

// Route to verify OTP
exports.verifyOTP = async (req, res, next) => {
  const { name, email, otp } = req.body;
  if (otpStore[email] === otp) {
    delete otpStore[email]; // Remove OTP after successful verification

    res.status(200).send('Email verified successfully');
  } else {
    res.status(400).send('Invalid OTP');
  }
};
