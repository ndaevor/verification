const User = require('../../db/models/userSchema');

exports.submitForm = async (req, res, next) => {
  const { name, email, phone, aadhar, pan, bank, ifsc, gst, pincode } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [
        { email },
        { phone },
        { aadhar },
        { pan },
        { bank }
      ]
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'User already exists.'
      });
    }

    const newUser = await User.create({
      name,
      email,
      phone,
      aadhar,
      pan,
      bank,
      ifsc,
      gst,
      pincode
    });

    res.status(200).json({
      message: 'Form added successfully',
      user: newUser 
    });
  } catch (error) {
    next(error); 
  }
};
