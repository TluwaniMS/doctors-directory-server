const MainDirectoryModelProperties = require('../model-properties/main-model-properties');
const DoctorsModelProperties = require('../model-properties/doctors-model-properties');

function calculateMunicipalityHospitalCount(municipalitiesWithHospitals) {
	const municipalitiesWithHospitalCount = [];

	const municipalityNames = extractMunicipalityNames(
		municipalitiesWithHospitals
	);

	municipalityNames.forEach((municipality) => {
		const hospitalsLinkedToMunicipality =
			extractContentLinkedToMunicipality(
				municipalitiesWithHospitals,
				municipality,
				MainDirectoryModelProperties.Hospitals
			);
		const totalHospitals = hospitalsLinkedToMunicipality.length;

		const formattedMunicipalityInfo = {
			municipalityName: municipality,
			totalHospitals: totalHospitals
		};

		municipalitiesWithHospitalCount.push(formattedMunicipalityInfo);
	});

	return municipalitiesWithHospitalCount;
}

function calculateMunicipalityDoctorsCount(
	municipalitiesWithHospitalsAndNestedDoctors
) {
	const municipalitiesWithDoctorsCount = [];

	const municipalityNames = extractMunicipalityNames(
		municipalitiesWithHospitalsAndNestedDoctors
	);

	municipalityNames.forEach((municipality) => {
		const hospitalsLinkedToMunicipality =
			extractContentLinkedToMunicipality(
				municipalitiesWithHospitalsAndNestedDoctors,
				municipality,
				MainDirectoryModelProperties.Hospitals
			);

		const doctorsLinkedToHospitals = extractDoctorsLinkedToHospitals(
			hospitalsLinkedToMunicipality
		);

		const totalDoctors = doctorsLinkedToHospitals.length;

		const preparedMunicipality = {
			municipalityName: municipality,
			totalDoctors: totalDoctors
		};

		municipalitiesWithDoctorsCount.push(preparedMunicipality);
	});

	return municipalitiesWithDoctorsCount;
}

function calculateMunicipalityGenderCount(
	municipalitiesWithHospitalsAndNestedDoctors
) {
	const municipalitiesWithDoctorsGenderCount = [];

	const municipalityNames = extractMunicipalityNames(
		municipalitiesWithHospitalsAndNestedDoctors
	);

	municipalityNames.forEach((municipality) => {
		const hospitalsLinkedToMunicipality =
			extractContentLinkedToMunicipality(
				municipalitiesWithHospitalsAndNestedDoctors,
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

		municipalitiesWithDoctorsGenderCount.push(preparedMunicipality);
	});

	return municipalitiesWithDoctorsGenderCount;
}

function extractMunicipalityNames(municipalitiesWithHospitals) {
	const municipalityNames = municipalitiesWithHospitals.map(
		(municipality) => municipality.municipalityName
	);

	const uniqueMunicipalityNames = [...new Set(municipalityNames)];

	return uniqueMunicipalityNames;
}

function extractContentLinkedToMunicipality(
	municipalitiesWithHospitals,
	municipalityName,
	property
) {
	const contentLinkedToMunicipality = municipalitiesWithHospitals.filter(
		(municipality) => municipality.municipalityName === municipalityName
	);
	const content = contentLinkedToMunicipality.map(
		(municipality) => municipality[property]
	);

	return content;
}

function extractDoctorsLinkedToHospitals(hospitalsWithDoctors) {
	const doctors = hospitalsWithDoctors.map(
		(hospital) => hospital[MainDirectoryModelProperties.Doctors]
	);

	return doctors;
}

function extractDoctorsByGender(doctors, gender) {
	const doctorsOfASpecificGender = doctors.filter(
		(doctor) => doctor.gender === gender
	);

	return doctorsOfASpecificGender;
}
module.exports = {
	calculateMunicipalityHospitalCount,
	calculateMunicipalityDoctorsCount,
	calculateMunicipalityGenderCount
};
