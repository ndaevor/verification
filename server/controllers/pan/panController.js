const axios = require('axios');

exports.verifyPAN = async (req, res) => {
  const { pan } = req.body;
  const options = {
    method: 'POST',
    url: 'https://aadhaar-number-verification-api-using-pan-number.p.rapidapi.com/api/validation/pan_to_aadhaar',
    headers: {
      // 'x-rapidapi-key': '65448e4847msha03cbce039f3014p13ce32jsn80e6e0bfe860',
      // 'x-rapidapi-key': '6b350e677dmsh12c5acecc5ff40dp1cf29ejsna629354ef77c',
      // 'x-rapidapi-key': '43f4455f3fmsh33a483d3b179dfbp110cadjsn7dbefc1c5911',
      'x-rapidapi-key': '544b42d2e2msh564105a57c22990p1342cfjsn72960564a3ba',
      'x-rapidapi-host':
        'aadhaar-number-verification-api-using-pan-number.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
    data: {
      pan: pan,
      consent: 'y',
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
