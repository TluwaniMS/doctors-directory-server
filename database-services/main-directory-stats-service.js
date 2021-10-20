const { Doctor } = require('../models/doctor');
const { Hospital } = require('../models/hospital');
const { Municipality } = require('../models/municipality');
const { sequelize } = require('../database-config');

async function getTotalOfDoctorsInDirectory() {
	const totalDoctors = await Doctor.findAll({
		attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'total']],
		raw: true
	});

	return totalDoctors;
}

async function getTotalOfHospitalsInDirectory() {
	const totalHospitals = await Hospital.findAll({
		attributes: [
			[sequelize.fn('COUNT', sequelize.col('hospitalKey')), 'total']
		],
		raw: true
	});

	return totalHospitals;
}

async function getTotalOfMunicipalitiesInDirectory() {
	const totalMunicipalities = await Municipality.findAll({
		attributes: [
			[sequelize.fn('COUNT', sequelize.col('municipalityKey')), 'total']
		],
		raw: true
	});

	return totalMunicipalities;
}

async function getTotalOfDoctorsGroupedBySpecialty() {
	const specialtyCount = await Doctor.findAll({
		attributes: [
			'specialty',
			[sequelize.fn('COUNT', sequelize.col('specialty')), 'total']
		],
		group: ['specialty'],
		raw: true
	});

	return specialtyCount;
}

async function getTotalDoctorsGroupedByGender() {
	const doctorsGroupedByGenderCount = await Doctor.findAll({
		attributes: [
			'gender',
			[sequelize.fn('COUNT', sequelize.col('gender')), 'total']
		],
		group: ['gender'],
		raw: true
	});

	return doctorsGroupedByGenderCount;
}

module.exports = {
	getTotalOfDoctorsInDirectory,
	getTotalOfHospitalsInDirectory,
	getTotalOfMunicipalitiesInDirectory,
	getTotalOfDoctorsGroupedBySpecialty,
	getTotalDoctorsGroupedByGender
};
