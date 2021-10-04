const { Doctor } = require('../models/doctor');
const { sequelize } = require('../database-config');

async function getTotalOfDoctorsGroupedByGenderAndSpecialty() {
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

async function getTotalSpecialtyCount() {
	const specialtyCount = await Doctor.findAll({
		attributes: [
			'specialty',
			[sequelize.fn('COUNT', sequelize.col('specialty')), 'total']
		],
		group: ['specialty']
	});

	return specialtyCount;
}

module.exports = {
	getTotalSpecialtyCount,
	getTotalOfDoctorsGroupedByGenderAndSpecialty
};
