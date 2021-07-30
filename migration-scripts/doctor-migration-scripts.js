const { Doctor } = require('../models/doctor');
const { doctors } = require('../sample-data/doctors');
const {
	hashDoctorsPasswords
} = require('../migration-script-services/doctors-creation-migration-service');

async function createSampleDoctors() {
	const doctorsWithHashedPasswords = hashDoctorsPasswords(doctors);
	await Doctor.bulkCreate(doctorsWithHashedPasswords);
}

module.exports = { createSampleDoctors };
