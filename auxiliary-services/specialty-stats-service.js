const DoctorsModelProperties = require('../model-properties/doctors-model-properties');
const ArrayOfSpecialtyModelProperties = require('../model-properties/array-of-specialty-model-properties');
const MainDirectoryModelProperties = require('../model-properties/main-model-properties');
const {
	extractMunicipalityNames,
	extractContentLinkedToMunicipality,
	extractDoctorsLinkedToHospitals,
	extractDoctorsByGender
} = require('./municipality-stats-service');

function formatSpecialtyCountByGender(specialtyCount) {
	const preparedSpecialtyCountGroupedByGender = [];

	const linkedMaleCount = specialtyCount.filter(
		(count) => count.gender === DoctorsModelProperties.Gender.Male
	);
	const linkedFemaleCount = specialtyCount.filter(
		(count) => count.gender === DoctorsModelProperties.Gender.Female
	);

	const maleCount =
		linkedMaleCount.length > 0 ? parseInt(linkedMaleCount[0].total) : 0;
	const femaleCount =
		linkedFemaleCount.length > 0 ? parseInt(linkedFemaleCount[0].total) : 0;

	const maleCountObject = {
		gender: DoctorsModelProperties.Gender.Male,
		total: maleCount
	};
	const femaleCountObject = {
		gender: DoctorsModelProperties.Gender.Female,
		total: femaleCount
	};

	preparedSpecialtyCountGroupedByGender.push(
		maleCountObject,
		femaleCountObject
	);

	return preparedSpecialtyCountGroupedByGender;
}

function formatSpecialtyCountInMunicipalityByGenderAndSpecialty(
	specialtyCount
) {
	const preparedMunicipalitiesWithDoctorscountGroupedByGenderAndSpecialty =
		[];
	const municipalityNames = extractMunicipalityNames(specialtyCount);

	municipalityNames.forEach((municipality) => {
		const hospitalsLinkedToMunicipality =
			extractContentLinkedToMunicipality(
				specialtyCount,
				municipality,
				MainDirectoryModelProperties.Hospitals
			);

		const doctorsLinkedToHospitals = extractDoctorsLinkedToHospitals(
			hospitalsLinkedToMunicipality
		);

		const maleDoctors = extractDoctorsByGender(
			doctorsLinkedToHospitals,
			DoctorsModelProperties.Gender.Male
		);
		const femaleDoctors = extractDoctorsByGender(
			doctorsLinkedToHospitals,
			DoctorsModelProperties.Gender.Female
		);

		const totalMaleDoctors = maleDoctors.length;
		const totalFemaleDoctors = femaleDoctors.length;

		const preparedMunicipality = {
			municipalityName: municipality,
			totalMaleDoctors: totalMaleDoctors,
			totalFemaleDoctors: totalFemaleDoctors
		};

		preparedMunicipalitiesWithDoctorscountGroupedByGenderAndSpecialty.push(
			preparedMunicipality
		);
	});

	return preparedMunicipalitiesWithDoctorscountGroupedByGenderAndSpecialty;
}

module.exports = {
	formatSpecialtyCountByGender,
	formatSpecialtyCountInMunicipalityByGenderAndSpecialty
};
