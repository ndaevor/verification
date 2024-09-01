const express = require('express');
const cors = require('cors');
const db = require('./db');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });
// require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.static('/public'));
app.use(express.urlencoded({ extended: true }));

// let otpStore = {}; // In-memory store for OTPs

const routes = require('./routes');
app.use(routes);

const server = app.listen(process.env.PORT || 8888, () => {
  console.log(`Express running → On PORT : ${server.address().port}`);
});
