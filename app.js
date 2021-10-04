const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {
	unknownRequests,
	errorResponse
} = require('./middleware/error-handler');
const doctorsRoute = require('./routes/doctors');
const hospitalsRoute = require('./routes/hospitals');
const authenticationsRoute = require('./routes/authentication');
const specialitiesRoute = require('./routes/specialities');
const municipalitiesRoute = require('./routes/municipalities');
const directoryStatisticsRoute = require('./routes/directory-statistics');
const specialtiesStatisticsRoute = require('./routes/specialty-statistics');
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms')
);

app.use('/api/doctors', doctorsRoute);
app.use('/api/hospitals', hospitalsRoute);
app.use('/api/authentications', authenticationsRoute);
app.use('/api/specialties', specialitiesRoute);
app.use('/api/municipalities', municipalitiesRoute);
app.use('/api/directory-statistics', directoryStatisticsRoute);
app.use('/api/specialty-statistics', specialtiesStatisticsRoute);

app.use(unknownRequests);
app.use(errorResponse);

module.exports = {
	app
};
