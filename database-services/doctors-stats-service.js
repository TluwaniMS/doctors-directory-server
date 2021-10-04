const { Doctor } = require('../models/doctor');
const { sequelize } = require('../database-config');

async function getTotalDoctorsStatsGroupedByGender() {
	const doctorsGroupedByGenderCount = await Doctor.findAll({
		attributes: [
			'gender',
			[sequelize.fn('COUNT', sequelize.col('gender')), 'n_gender']
		],
		group: ['gender']
	});

	return doctorsGroupedByGenderCount;
}

module.exports = {
	getTotalDoctorsStatsGroupedByGender
};
