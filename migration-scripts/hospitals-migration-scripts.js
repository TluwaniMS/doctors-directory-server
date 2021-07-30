const { Hospital } = require('../models/hospital');
const { hospitals } = require('../sample-data/hospitals');

async function createSampleHospitals() {
	await Hospital.bulkCreate(hospitals);
}

module.exports = { createSampleHospitals };
