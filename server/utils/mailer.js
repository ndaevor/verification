const nodemailer = require('nodemailer');
// Nodemailer configuration


exports.sendEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'OTP Verificatoin',
    text: `Your OTP code for verification is ${otp}`,
  });
};
