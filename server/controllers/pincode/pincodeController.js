const axios = require('axios');

exports.getAddress = async (req, res, next) => {
  const { pincode } = req.query;
  console.log('PIN', pincode);

  const options = {
    method: 'GET',
    url: `https://api.postalpincode.in/pincode/${pincode}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.request(options);
    console.log('RESPONSE', response.data[0].PostOffice[0]);
    res.status(200).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(400).send('Failed to fetch Address',error);
  }
};
