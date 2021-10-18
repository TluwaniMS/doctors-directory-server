const { Municipality } = require('../models/municipality');
const { Hospital } = require('../models/hospital');
const { Doctor } = require('../models/doctor');
const { sequelize } = require('../database-config');

async function getTotalSpecialtyCountBySpecialtyKey(specialtyKey) {
	const doctorsGroupedByGenderCount = await Doctor.findAll({
		where: { specialty: specialtyKey },
		attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'total']],
		raw: true
	});

	return doctorsGroupedByGenderCount;
}

async function getTotalOfDoctorsGroupedByGenderAndSpecialtyBySpecialtyKey(
	specialtyKey
) {
	const specialtyCount = await Doctor.findAll({
		where: { specialty: specialtyKey },
		attributes: [
			'gender',
			[sequelize.fn('COUNT', sequelize.col('gender')), 'total']
		],
		group: ['gender'],
		raw: true
	});

	return specialtyCount;
}

async function getMunicipalitiesWithHospitalsAndNestedDoctorSpecialtiesAndGenderBySpecialtyKey(
	specialtyKey
) {
	const municipalitiesWithHospitalsAndNestedDoctorSpecialtiesAndGender =
		await Municipality.findAll({
			attributes: ['municipalityName'],
			include: [
				{
					model: Hospital,
					attributes: ['hospitalName'],
					include: [
						{
							model: Doctor,
							attributes: ['specialty', 'gender'],
							where: { specialty: specialtyKey }
						}
					]
				}
			],
			raw: true,
			nest: true
		});

	return municipalitiesWithHospitalsAndNestedDoctorSpecialtiesAndGender;
}

async function getHospitalsWithNestedDoctorSpecialtiesAndGenderBySpecialtyKey(
	specialtyKey
) {
	const hospitalsAndNestedDoctorSpecialtiesAndGender = await Hospital.findAll(
		{
			attributes: ['hospitalName'],
			include: [
				{
					model: Doctor,
					attributes: ['specialty', 'gender'],
					where: { specialty: specialtyKey }
				}
			],

			raw: true,
			nest: true
		}
	);

	return hospitalsAndNestedDoctorSpecialtiesAndGender;
}

module.exports = {
	getTotalSpecialtyCountBySpecialtyKey,
	getTotalOfDoctorsGroupedByGenderAndSpecialtyBySpecialtyKey,
	getMunicipalitiesWithHospitalsAndNestedDoctorSpecialtiesAndGenderBySpecialtyKey,
	getHospitalsWithNestedDoctorSpecialtiesAndGenderBySpecialtyKey
};
