const { Doctor } = require('../models/doctor');
const { sequelize } = require('../database-config');

async function getTotalDoctorsByHospitalStatsGroupedByGender(hospitalKey) {
	const doctorsGroupedByGenderCount = await Doctor.findAll({
		where: { hospital: hospitalKey },
		attributes: [
			'gender',
			[sequelize.fn('COUNT', sequelize.col('gender')), 'n_gender']
		],
		group: ['gender']
	});

	return doctorsGroupedByGenderCount;
}

async function getTotalDoctorsByHospitalStatsGroupedByGenderAndSpecialty(
	hospitalKey
) {
	const doctorsGroupedByGenderAndSpecialtyCount = await Doctor.findAll({
		where: { hospital: hospitalKey },
		attributes: [
			'gender',
			'specialty',
			[sequelize.fn('COUNT', sequelize.col('gender')), 'n_gender']
		],
		group: ['gender', 'specialty']
	});

	return doctorsGroupedByGenderAndSpecialtyCount;
}

async function getTotalHospitalSpecialtyCount(hospitalKey) {
	const specialtyCount = await Doctor.findAll({
		where: { hospital: hospitalKey },
		attributes: [
			'specialty',
			[sequelize.fn('COUNT', sequelize.col('specialty')), 'total']
		],
		group: ['specialty']
	});

	return specialtyCount;
}
module.exports = {
	getTotalDoctorsByHospitalStatsGroupedByGender,
	getTotalDoctorsByHospitalStatsGroupedByGenderAndSpecialty,
	getTotalHospitalSpecialtyCount
};
