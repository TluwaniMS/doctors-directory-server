const { Municipality } = require('../models/municipality');
const { Hospital } = require('../models/hospital');
const { Doctor } = require('../models/doctor');
const { sequelize } = require('../database-config');

async function getMunicipalitiesWithHospitalsAndNestedDoctorGenders() {
	const municipalitiesWithHospitalsAndNestedDoctorGenders =
		await Municipality.findAll({
			attributes: ['municipalityName'],
			include: [
				{
					model: Hospital,
					attributes: ['hospitalName'],
					include: [
						{
							model: Doctor,
							attributes: ['gender']
						}
					]
				}
			]
		});

	return municipalitiesWithHospitalsAndNestedDoctorGenders;
}

async function getMunicipalitiesWithHospitalsAndNestedDoctorSpecialties() {
	const municipalitiesWithHospitalsAndNestedDoctorSpecialties =
		await Municipality.findAll({
			attributes: ['municipalityName'],
			include: [
				{
					model: Hospital,
					attributes: ['hospitalName'],
					include: [
						{
							model: Doctor,
							attributes: ['specialty']
						}
					]
				}
			]
		});

	return municipalitiesWithHospitalsAndNestedDoctorSpecialties;
}

async function getMunicipalitiesWithHospitalsAndNestedDoctorSpecialtiesAndGender() {
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
							attributes: ['specialty', 'gender']
						}
					]
				}
			]
		});

	return municipalitiesWithHospitalsAndNestedDoctorSpecialtiesAndGender;
}

async function getMunicipalitiesNestedWithHospitals() {
	const municipalitiesNestedWithHospitals = await Municipality.findAll({
		attributes: ['municipalityName'],
		include: [
			{
				model: Hospital,
				attributes: ['hospitalName']
			}
		]
	});

	return municipalitiesNestedWithHospitals;
}

async function getMunicipalitiesWithHospitalsAndNestedDoctors() {
	const municipalitiesWithHospitalsAndNestedDoctors =
		await Municipality.findAll({
			attributes: ['municipalityName'],
			include: [
				{
					model: Hospital,
					attributes: ['hospitalName'],
					include: [
						{
							model: Doctor
						}
					]
				}
			]
		});

	return municipalitiesWithHospitalsAndNestedDoctors;
}

module.exports = {
	getMunicipalitiesWithHospitalsAndNestedDoctorGenders,
	getMunicipalitiesWithHospitalsAndNestedDoctorSpecialties,
	getMunicipalitiesWithHospitalsAndNestedDoctorSpecialtiesAndGender,
	getMunicipalitiesNestedWithHospitals,
	getMunicipalitiesWithHospitalsAndNestedDoctors
};
