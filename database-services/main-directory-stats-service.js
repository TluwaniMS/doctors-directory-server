const { Doctor } = require('../models/doctor');
const { Hospital } = require('../models/hospital');
const { sequelize } = require('../database-config');

async function getTotalOfDoctorsInDirectory() {
	const totalDoctors = await Doctor.findAll({
		attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'total']]
	});

	return totalDoctors;
}

async function getTotalOfHospitalsInDirectory() {
	const totalHospitals = await Hospital.findAll({
		attributes: [
			[sequelize.fn('COUNT', sequelize.col('hospitalKey')), 'total']
		]
	});

	return totalHospitals;
}

module.exports = {
	getTotalOfDoctorsInDirectory,
	getTotalOfHospitalsInDirectory
};
