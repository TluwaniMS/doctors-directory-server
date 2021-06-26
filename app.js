const express = require('express')
const cors = require('cors')
const helmet = require("helmet");
const dotenv = require('dotenv');
const app = express()

dotenv.config();
app.use(cors())
app.use(helmet());

module.exports = {
    app
}