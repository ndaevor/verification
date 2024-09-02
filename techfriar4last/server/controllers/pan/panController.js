const axios = require('axios');

exports.verifyPAN = async (req, res) => {
  const { pan } = req.body;
  const options = {
    method: 'POST',
    url: 'https://pan-information-verification-api.p.rapidapi.com/validation/api/v1/panverification',
    headers: {
      'x-rapidapi-key': 'c52e248b26msh1585437c44a5746p10acfcjsn480bec4e2b17',
      'x-rapidapi-host': 'pan-information-verification-api.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
    data: {
      pan: pan,
      consent: 'yes',
      consent_text:
        'I hear by declare my consent agreement for fetching my information via AITAN Labs API',
    },
  };
  try {
    const response = await axios.request(options);
    console.log(response.data.result);
    res.status(200).send({
      data:
        response.data.result !== null
          ? response.data.result.link_status
          : response.data.result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
