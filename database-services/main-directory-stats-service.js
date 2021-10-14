const { Doctor } = require('../models/doctor');
const { sequelize } = require('../database-config');

async function getTotalOfDoctorsInDirectory() {
	const totalDoctors = await Doctor.findAll({
		attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'total']]
	});

	return totalDoctors;
}

module.exports = { getTotalOfDoctorsInDirectory };
