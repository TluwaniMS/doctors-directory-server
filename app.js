const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const morgan = require('morgan');
const {
	unknownRequests,
	errorResponse
} = require('./middleware/error-handler');

const authenticationRoute = require('./routes/authentication');
const bookRentalsRoute = require('./routes/book-rental');
const booksRoute = require('./routes/books');
const rentedBooksRoute = require('./routes/rented-books');
const usersRoute = require('./routes/users');
const app = express();

dotenv.config();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms')
);

app.use('/api/authentication', authenticationRoute);
app.use('/api/book-rentals', bookRentalsRoute);
app.use('/api/books', booksRoute);
app.use('/api/rented-books', rentedBooksRoute);
app.use('/api/users', usersRoute);

app.use(unknownRequests);
app.use(errorResponse);

module.exports = {
	app
};
