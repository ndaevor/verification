const express = require('express');
const twilio = require('twilio');

const client = twilio(
  'AC54aa3046deddd1a115b297835cbf44d3',
  '6c236435e9c62f49271c2db34da74822'
);

exports.sendOTP = async (req, res) => {
  const { phone } = req.body;
  try {
    await client.verify.v2
      .services('VAdec595717338d4f1aec230ba485552e9')
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
      .services('VAdec595717338d4f1aec230ba485552e9')
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
