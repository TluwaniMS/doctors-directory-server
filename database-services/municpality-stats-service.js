const { Municipality } = require('../models/municipality');
const { Hospital } = require('../models/hospital');
const { Doctor } = require('../models/doctor');

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
			],
			raw: true,
			nest: true
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
			],
			raw: true,
			nest: true
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
			],
			raw: true,
			nest: true
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
		],
		raw: true,
		nest: true
	});

	console.log(municipalitiesNestedWithHospitals);
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
			],
			raw: true,
			nest: true
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
