const { message } = require('antd');
const axios = require('axios');

exports.verifyAadhar = async (req, res) => {
  const { aadhar } = req.body;
  const options = {
    method: 'POST',
    url: 'https://api.apyhub.com/validate/aadhaar',
    headers: {
      'apy-token':
        'APY0n4wNXyNQ2ETTT0mWjjpa8WXRZ5aULj0fYD8cwyAIPPnqzilrL5EnnyivoAIQIpESpvM',
        // 'APY0w0TPIhVh8EPVjzkLI5SeU5JEVxjMC3jOG3HHa0UPrgWYmRJZiDrLDhmmcO13l2Ly'
      'Content-Type': 'application/json',
    },
    data: { aadhaar: aadhar },
  };
  try {
    const response = await axios.request(options);
    res.status(200).send({ data: response.data.data });
    // console.log('HHHHH',response.data.data)
    // console.log('IIIII',response.data)
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
