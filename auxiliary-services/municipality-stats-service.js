const MainDirectoryModelProperties = require('../model-properties/main-model-properties');
const DoctorsModelProperties = require('../model-properties/doctors-model-properties');
const ArrayOfSpecialtyModelProperties = require('../model-properties/array-of-specialty-model-properties');
const { hospitals } = require('../sample-data/hospitals');

function calculateMunicipalityHospitalCount(municipalitiesWithHospitals) {
	const municipalitiesWithHospitalCount = [];

	const municipalityNames = extractMunicipalityNames(municipalitiesWithHospitals);

	municipalityNames.forEach((municipality) => {
		const hospitalsLinkedToMunicipality = extractContentLinkedToMunicipality(
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

function calculateMunicipalityDoctorsCount(municipalitiesWithHospitalsAndNestedDoctors) {
	const municipalitiesWithDoctorsCount = [];

	const municipalityNames = extractMunicipalityNames(municipalitiesWithHospitalsAndNestedDoctors);

	municipalityNames.forEach((municipality) => {
		const hospitalsLinkedToMunicipality = extractContentLinkedToMunicipality(
			municipalitiesWithHospitalsAndNestedDoctors,
			municipality,
			MainDirectoryModelProperties.Hospitals
		);

		const doctorsLinkedToHospitals = extractDoctorsLinkedToHospitals(hospitalsLinkedToMunicipality);

		const totalDoctors = doctorsLinkedToHospitals.length;

		const preparedMunicipality = {
			municipalityName: municipality,
			totalDoctors: totalDoctors
		};

		municipalitiesWithDoctorsCount.push(preparedMunicipality);
	});

	return municipalitiesWithDoctorsCount;
}

function calculateMunicipalityGenderCount(municipalitiesWithHospitalsAndNestedDoctors) {
	const municipalitiesWithDoctorsGenderCount = [];

	const municipalityNames = extractMunicipalityNames(municipalitiesWithHospitalsAndNestedDoctors);

	municipalityNames.forEach((municipality) => {
		const hospitalsLinkedToMunicipality = extractContentLinkedToMunicipality(
			municipalitiesWithHospitalsAndNestedDoctors,
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

		municipalitiesWithDoctorsGenderCount.push(preparedMunicipality);
	});

	return municipalitiesWithDoctorsGenderCount;
}

function calculateMunicipalitySpecialityCount(municipalitiesWithHospitalsNestedWithDoctorSpecialties) {
	const municipalitiesWithDoctorsSpecialtyCount = [];

	const municipalityNames = extractMunicipalityNames(municipalitiesWithHospitalsNestedWithDoctorSpecialties);

	municipalityNames.forEach((municipality) => {
		const hospitalsLinkedToMunicipality = extractContentLinkedToMunicipality(
			municipalitiesWithHospitalsNestedWithDoctorSpecialties,
			municipality,
			MainDirectoryModelProperties.Hospitals
		);

		const doctorsLinkedToHospitals = extractDoctorsLinkedToHospitals(hospitalsLinkedToMunicipality);

		const formattedSpecialtyCounts = extractDoctorsSpecialtyAndCalculateTotalCount(doctorsLinkedToHospitals);

		const preparedMunicipalityWithSpecialtyCounts = {
			municipalityName: municipality,
			specialties: formattedSpecialtyCounts
		};

		municipalitiesWithDoctorsSpecialtyCount.push(preparedMunicipalityWithSpecialtyCounts);
	});

	return municipalitiesWithDoctorsSpecialtyCount;
}

function calculateMunicipalitySpecialitiesGroupedByGenderCount(
	municipalitiesWithHospitalsNestedWithDoctorSpecialtiesAndGender
) {
	const municipalitiesWithDoctorsSpecialtyCountGroupedByGender = [];

	const municipalityNames = extractMunicipalityNames(municipalitiesWithHospitalsNestedWithDoctorSpecialtiesAndGender);

	municipalityNames.forEach((municipality) => {
		const hospitalsLinkedToMunicipality = extractContentLinkedToMunicipality(
			municipalitiesWithHospitalsNestedWithDoctorSpecialtiesAndGender,
			municipality,
			MainDirectoryModelProperties.Hospitals
		);

		const doctorsLinkedToHospitals = extractDoctorsLinkedToHospitals(hospitalsLinkedToMunicipality);

		const formattedSpecialtyCountsGroupedByGender =
			extractDoctorsSpecialtyGroupedByGenderAndCalculateTotalCount(doctorsLinkedToHospitals);

		const preparedMunicipalityWithSpecialtyCountsGroupedByGender = {
			municipalityName: municipality,
			specialties: formattedSpecialtyCountsGroupedByGender
		};

		municipalitiesWithDoctorsSpecialtyCountGroupedByGender.push(
			preparedMunicipalityWithSpecialtyCountsGroupedByGender
		);
	});

	return municipalitiesWithDoctorsSpecialtyCountGroupedByGender;
}

function extractMunicipalityNames(municipalitiesWithHospitals) {
	const municipalityNames = municipalitiesWithHospitals.map((municipality) => municipality.municipalityName);

	const uniqueMunicipalityNames = [...new Set(municipalityNames)];

	return uniqueMunicipalityNames;
}

function extractContentLinkedToMunicipality(municipalitiesWithHospitals, municipalityName, property) {
	const contentLinkedToMunicipality = municipalitiesWithHospitals.filter(
		(municipality) => municipality.municipalityName === municipalityName
	);
	const content = contentLinkedToMunicipality.map((municipality) => municipality[property]);

	return content;
}

function extractDoctorsLinkedToHospitals(hospitalsWithDoctors) {
	const doctors = hospitalsWithDoctors.map((hospital) => hospital[MainDirectoryModelProperties.Doctors]);

	return doctors;
}

function extractDoctorsByGender(doctors, gender) {
	const doctorsOfASpecificGender = doctors.filter((doctor) => doctor.gender === gender);

	return doctorsOfASpecificGender;
}

function extractDoctorsSpecialtyAndCalculateTotalCount(doctors) {
	const preparedDoctorsSpecialtyCounts = [];

	ArrayOfSpecialtyModelProperties.forEach((specialty) => {
		const doctorsLinkedToSpecialty = doctors.filter((doctor) => doctor.specialty === specialty.SpecialtyKey);

		const totalDoctorsLinkedToSpecialty = doctorsLinkedToSpecialty.length;

		const formattedSpecialtyCount = {
			specialtyName: specialty.SpecialtyName,
			total: totalDoctorsLinkedToSpecialty
		};

		preparedDoctorsSpecialtyCounts.push(formattedSpecialtyCount);
	});

	return preparedDoctorsSpecialtyCounts;
}

function extractDoctorsSpecialtyGroupedByGenderAndCalculateTotalCount(doctors) {
	const preparedDoctorsSpecialtyGroupedByGenderCounts = [];

	ArrayOfSpecialtyModelProperties.forEach((specialty) => {
		const maleDoctorsLinkedToSpecialty = doctors.filter(
			(doctor) =>
				doctor.specialty === specialty.SpecialtyKey && doctor.gender === DoctorsModelProperties.Gender.Male
		);
		const femaleDoctorsLinkedToSpecialty = doctors.filter(
			(doctor) =>
				doctor.specialty === specialty.SpecialtyKey && doctor.gender === DoctorsModelProperties.Gender.Female
		);

		const totalMaleDoctorsInSpecialty = maleDoctorsLinkedToSpecialty.length;
		const totalFemaleDoctorsInSpecialty = femaleDoctorsLinkedToSpecialty.length;

		const formattedSpecialtyCount = {
			SpecialtyName: specialty.SpecialtyName,
			maleCount: totalMaleDoctorsInSpecialty,
			femaleCount: totalFemaleDoctorsInSpecialty
		};

		preparedDoctorsSpecialtyGroupedByGenderCounts.push(formattedSpecialtyCount);
	});

	return preparedDoctorsSpecialtyGroupedByGenderCounts;
}

function calculateTotalDoctorsInHospitalsAndFormatData(municipalHospitalsWithDoctors) {
	const preparedHospitals = [];
	const municipalHospitals = municipalHospitalsWithDoctors.map((municipality) => municipality.Hospitals);

	hospitals.forEach((hospital) => {
		const linkedHospitals = municipalHospitals.filter(
			(municipalHosp) => municipalHosp.hospitalName === hospital.hospitalName
		);

		let totalDoctorsInHospitalArray = linkedHospitals.map((hosp) => hosp.Doctors);

		const preparedHospitalData =
			linkedHospitals.length > 0
				? {
						hospitalName: hospital.hospitalName,
						total: totalDoctorsInHospitalArray.length
				  }
				: '';

		linkedHospitals.length > 0 ? preparedHospitals.push(preparedHospitalData) : '';
	});

	return preparedHospitals;
}
module.exports = {
	calculateMunicipalityHospitalCount,
	calculateMunicipalityDoctorsCount,
	calculateMunicipalityGenderCount,
	calculateMunicipalitySpecialityCount,
	calculateMunicipalitySpecialitiesGroupedByGenderCount,
	extractMunicipalityNames,
	extractContentLinkedToMunicipality,
	extractDoctorsLinkedToHospitals,
	extractDoctorsByGender,
	calculateTotalDoctorsInHospitalsAndFormatData
};
