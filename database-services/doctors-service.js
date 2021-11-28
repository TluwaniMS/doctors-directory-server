const { Doctor } = require('../models/doctor');

async function getAllDoctors() {
	const doctors = await Doctor.findAll({
		attributes: ['id', 'firstName', 'lastName', 'gender', 'hospital', 'specialty']
	});

	return doctors;
}

async function findDoctorsFromHospitalKeysArray(hospitalKeysArray) {
	const doctors = await Doctor.findAll({
		attributes: ['id', 'firstName', 'lastName', 'gender', 'hospital', 'specialty'],
		where: { hospital: hospitalKeysArray }
	});

	return doctors;
}

module.exports = { getAllDoctors, findDoctorsFromHospitalKeysArray };
