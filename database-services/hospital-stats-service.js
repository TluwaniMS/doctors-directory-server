const { Doctor } = require('../models/doctor');
const { sequelize } = require('../database-config');

async function getTotalDoctorsByHospitalStatsGroupedByGender(hospitalKey) {
	const doctorsGroupedByGenderCount = await Doctor.findAll({
		where: { hospital: hospitalKey },
		attributes: [
			'gender',
			[sequelize.fn('COUNT', sequelize.col('gender')), 'total']
		],
		group: ['gender'],
		raw: true
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
			[sequelize.fn('COUNT', sequelize.col('gender')), 'total']
		],
		group: ['gender', 'specialty'],
		raw: true
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
		group: ['specialty'],
		raw: true
	});

	return specialtyCount;
}
module.exports = {
	getTotalDoctorsByHospitalStatsGroupedByGender,
	getTotalDoctorsByHospitalStatsGroupedByGenderAndSpecialty,
	getTotalHospitalSpecialtyCount
};
