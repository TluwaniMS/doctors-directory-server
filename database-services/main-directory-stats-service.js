const { Doctor } = require('../models/doctor');
const { Hospital } = require('../models/hospital');
const { Municipality } = require('../models/municipality');
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

async function getTotalOfMunicipalitiesInDirectory() {
	const totalMunicipalities = await Municipality.findAll({
		attributes: [
			[sequelize.fn('COUNT', sequelize.col('municipalityKey')), 'total']
		]
	});

	return totalMunicipalities;
}

module.exports = {
	getTotalOfDoctorsInDirectory,
	getTotalOfHospitalsInDirectory,
	getTotalOfMunicipalitiesInDirectory
};
