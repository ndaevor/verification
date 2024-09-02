const express = require('express');
const twilio = require('twilio');

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

exports.sendOTP = async (req, res) => {
  const { phone } = req.body;
  try {
    await client.verify.v2
      .services(TWILIO_SERVICE_ID)
      .verifications.create({ to: phone, channel: 'sms' });

    res.status(200).send('OTP sent successfully');
  } catch (error) {
    res.status(500).send('Failed to send OTP');
  }
};

exports.verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;
  try {
    const verificationCheck = await client.verify.v2
      .services(TWILIO_SERVICE_ID)
      .verificationChecks.create({ to: phone, code: otp });

    if (verificationCheck.status === 'approved') {
      res.status(200).send('OTP verified successfully');
    } else {
      res.status(400).send('Invalid OTP');
    }
  } catch (error) {
    res.status(500).send('Failed to verify OTP');
  }
};
