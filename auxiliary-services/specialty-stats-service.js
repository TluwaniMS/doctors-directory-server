const DoctorsModelProperties = require('../model-properties/doctors-model-properties');
const ArrayOfSpecialtyModelProperties = require('../model-properties/array-of-specialty-model-properties');
const MainDirectoryModelProperties = require('../model-properties/main-model-properties');
const {
	extractMunicipalityNames,
	extractContentLinkedToMunicipality,
	extractDoctorsLinkedToHospitals,
	extractDoctorsByGender
} = require('./municipality-stats-service');
const { hospitals } = require('../sample-data/hospitals');

function formatSpecialtyCountByGender(specialtyCount) {
	const preparedSpecialtyCountGroupedByGender = [];

	const linkedMaleCount = specialtyCount.filter((count) => count.gender === DoctorsModelProperties.Gender.Male);
	const linkedFemaleCount = specialtyCount.filter((count) => count.gender === DoctorsModelProperties.Gender.Female);

	const maleCount = linkedMaleCount.length > 0 ? parseInt(linkedMaleCount[0].total) : 0;
	const femaleCount = linkedFemaleCount.length > 0 ? parseInt(linkedFemaleCount[0].total) : 0;

	const maleCountObject = {
		gender: DoctorsModelProperties.Gender.Male,
		total: maleCount
	};
	const femaleCountObject = {
		gender: DoctorsModelProperties.Gender.Female,
		total: femaleCount
	};

	preparedSpecialtyCountGroupedByGender.push(maleCountObject, femaleCountObject);

	return preparedSpecialtyCountGroupedByGender;
}

function formatSpecialtyCountInMunicipalityByGenderAndSpecialty(specialtyCount) {
	const preparedMunicipalitiesWithDoctorscountGroupedByGenderAndSpecialty = [];
	const municipalityNames = extractMunicipalityNames(specialtyCount);

	municipalityNames.forEach((municipality) => {
		const hospitalsLinkedToMunicipality = extractContentLinkedToMunicipality(
			specialtyCount,
			municipality,
			MainDirectoryModelProperties.Hospitals
		);

		const doctorsLinkedToHospitals = extractDoctorsLinkedToHospitals(hospitalsLinkedToMunicipality);

		const maleDoctors = extractDoctorsByGender(doctorsLinkedToHospitals, DoctorsModelProperties.Gender.Male);
		const femaleDoctors = extractDoctorsByGender(doctorsLinkedToHospitals, DoctorsModelProperties.Gender.Female);

		const totalMaleDoctors = maleDoctors.length;
		const totalFemaleDoctors = femaleDoctors.length;

		const preparedMunicipality = {
			municipalityName: municipality,
			totalMaleDoctors: totalMaleDoctors,
			totalFemaleDoctors: totalFemaleDoctors
		};

		preparedMunicipalitiesWithDoctorscountGroupedByGenderAndSpecialty.push(preparedMunicipality);
	});

	return preparedMunicipalitiesWithDoctorscountGroupedByGenderAndSpecialty;
}

function formatSpecialtyCountGroupedByGenderInHoispitals(specialtyCount) {
	const preparedHospitalsWithSpecialtyCountGroupedByGender = [];

	hospitals.forEach((hospital) => {
		hospitalsLinkedToCurrentHospital = specialtyCount.filter(
			(count) => count.hospitalName === hospital.hospitalName
		);
		doctorsLinkedToHospital = hospitalsLinkedToCurrentHospital.map((hospital) => hospital.Doctors);

		femaleCount = doctorsLinkedToHospital.filter(
			(doctor) => doctor.gender === DoctorsModelProperties.Gender.Female
		);
		maleCount = doctorsLinkedToHospital.filter((doctor) => doctor.gender === DoctorsModelProperties.Gender.Male);

		totalMaleCount = maleCount.length;
		totalFemaleCount = femaleCount.length;

		preparedHospitalHospital = {
			hospitalName: hospital.hospitalName,
			totalFemaleDoctors: totalFemaleCount,
			totalMaleDoctors: totalMaleCount
		};

		preparedHospitalsWithSpecialtyCountGroupedByGender.push(preparedHospitalHospital);
	});

	return preparedHospitalsWithSpecialtyCountGroupedByGender;
}
module.exports = {
	formatSpecialtyCountByGender,
	formatSpecialtyCountInMunicipalityByGenderAndSpecialty,
	formatSpecialtyCountGroupedByGenderInHoispitals
};
