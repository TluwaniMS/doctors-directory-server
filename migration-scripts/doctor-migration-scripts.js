const { Doctor } = require('../models/doctor');
const { doctors } = require('../sample-data/doctors');

async function createSampleDoctors() {
	await Doctor.bulkCreate(doctors);
}

module.exports = { createSampleDoctors };
