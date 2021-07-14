const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");
const {
  unknownRequests,
  errorResponse
} = require("./middleware/error-handler");
const app = express();

dotenv.config();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(unknownRequests);
app.use(errorResponse);

module.exports = {
  app
};
