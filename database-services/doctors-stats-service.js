const { Doctor } = require('../models/doctor');
const { sequelize } = require('../database-config');

async function getDoctorsStatsGroupedByGender() {
	const doctorsGroupedByGenderCount = await Doctor.findAll({
		attributes: [
			'gender',
			[sequelize.fn('COUNT', sequelize.col('gender')), 'n_gender']
		],
		group: ['gender']
	});

	return doctorsGroupedByGenderCount;
}

async function getDoctorsStatsGroupedByGenderAndSpecialty() {
	const doctorsGroupedByGenderCount = await Doctor.findAll({
		attributes: [
			'gender',
			'specialty',
			[sequelize.fn('COUNT', sequelize.col('gender')), 'n_gender']
		],
		group: ['gender', 'specialty']
	});

	return doctorsGroupedByGenderCount;
}

module.exports = {
	getDoctorsStatsGroupedByGender,
	getDoctorsStatsGroupedByGenderAndSpecialty
};
