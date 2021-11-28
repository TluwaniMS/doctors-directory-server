const { Municipality } = require('../models/municipality');
const { Hospital } = require('../models/hospital');
const { Doctor } = require('../models/doctor');

async function getMunicipalitiesWithHospitalsAndNestedDoctorGenders() {
	const municipalitiesWithHospitalsAndNestedDoctorGenders = await Municipality.findAll({
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

async function getMunicipalityWithHospitalsAndNestedDoctorGendersByKey(municipalKey) {
	const municipalityWithHospitalsAndNestedDoctorGenders = await Municipality.findAll({
		where: { municipalityKey: municipalKey },
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

	return municipalityWithHospitalsAndNestedDoctorGenders;
}

async function getMunicipalitiesWithHospitalsAndNestedDoctorSpecialties() {
	const municipalitiesWithHospitalsAndNestedDoctorSpecialties = await Municipality.findAll({
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

async function getMunicipalityWithHospitalsAndNestedDoctorSpecialtiesByKey(municipalKey) {
	const municipalityWithHospitalsAndNestedDoctorSpecialties = await Municipality.findAll({
		where: { municipalityKey: municipalKey },
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

	return municipalityWithHospitalsAndNestedDoctorSpecialties;
}

async function getMunicipalitiesWithHospitalsAndNestedDoctorSpecialtiesAndGender() {
	const municipalitiesWithHospitalsAndNestedDoctorSpecialtiesAndGender = await Municipality.findAll({
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

async function getMunicipalityWithHospitalsAndNestedDoctorSpecialtiesAndGenderByKey(municipalKey) {
	const municipalityWithHospitalsAndNestedDoctorSpecialtiesAndGender = await Municipality.findAll({
		where: { municipalityKey: municipalKey },
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

	return municipalityWithHospitalsAndNestedDoctorSpecialtiesAndGender;
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

	return municipalitiesNestedWithHospitals;
}

async function getMunicipalityNestedWithHospitalsByKey(municipalKey) {
	const municipalityNestedWithHospitals = await Municipality.findAll({
		where: { municipalityKey: municipalKey },
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

	return municipalityNestedWithHospitals;
}

async function getMunicipalitiesWithHospitalsAndNestedDoctors() {
	const municipalitiesWithHospitalsAndNestedDoctors = await Municipality.findAll({
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

async function getMunicipalityWithHospitalsAndNestedDoctorsByKey(municipalKey) {
	const municipalityWithHospitalsAndNestedDoctors = await Municipality.findAll({
		where: { municipalityKey: municipalKey },
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

	return municipalityWithHospitalsAndNestedDoctors;
}

module.exports = {
	getMunicipalitiesWithHospitalsAndNestedDoctorGenders,
	getMunicipalitiesWithHospitalsAndNestedDoctorSpecialties,
	getMunicipalitiesWithHospitalsAndNestedDoctorSpecialtiesAndGender,
	getMunicipalitiesNestedWithHospitals,
	getMunicipalitiesWithHospitalsAndNestedDoctors,
	getMunicipalityWithHospitalsAndNestedDoctorGendersByKey,
	getMunicipalityWithHospitalsAndNestedDoctorSpecialtiesByKey,
	getMunicipalityWithHospitalsAndNestedDoctorSpecialtiesAndGenderByKey,
	getMunicipalityNestedWithHospitalsByKey,
	getMunicipalityWithHospitalsAndNestedDoctorsByKey
};
