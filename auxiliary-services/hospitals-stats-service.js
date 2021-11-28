const ArrayOfSpecialtyModelProperties = require('../model-properties/array-of-specialty-model-properties');
const DoctorsModelProperties = require('../model-properties/doctors-model-properties');

function formatHospitalSpecialtyCount(specialtyCounts) {
	const preparedSpecialtyCounts = [];

	ArrayOfSpecialtyModelProperties.forEach((specialty) => {
		const linkedSpecialty = specialtyCounts.filter((count) => count.specialty === specialty.SpecialtyKey);

		const preparedSpecialty =
			linkedSpecialty.length > 0
				? prepareSpecialtyWithCountData(specialty, linkedSpecialty[0].total)
				: prepareSpecialtyWithNoCountData(specialty);

		preparedSpecialtyCounts.push(preparedSpecialty);
	});

	return preparedSpecialtyCounts;
}

function formatHospitalSpecialtyCountByGender(specialtyCounts) {
	const preparedSpecialtyCountGroupedByGender = [];

	ArrayOfSpecialtyModelProperties.forEach((specialty) => {
		const linkedSpecialty = specialtyCounts.filter((count) => count.specialty === specialty.SpecialtyKey);

		const linkedMaleCount = linkedSpecialty.filter((count) => count.gender === DoctorsModelProperties.Gender.Male);
		const linkedFemaleCount = linkedSpecialty.filter(
			(count) => count.gender === DoctorsModelProperties.Gender.Female
		);

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

		const preparedSpecialty = {
			specialtyName: specialty.SpecialtyName,
			genderCount: [maleCountObject, femaleCountObject]
		};

		preparedSpecialtyCountGroupedByGender.push(preparedSpecialty);
	});

	return preparedSpecialtyCountGroupedByGender;
}

function formatHospitalGenderCount(genderCount) {
	const formattedGenderCount = [];

	const maleCount = genderCount.filter((count) => count.gender === DoctorsModelProperties.Gender.Male);
	const femaleCount = genderCount.filter((count) => count.gender === DoctorsModelProperties.Gender.Female);

	const formattedTotalMaleCount =
		maleCount.length > 0
			? createGenderCountObject(DoctorsModelProperties.Gender.Male, parseInt(maleCount[0].total))
			: createGenderCountObject(DoctorsModelProperties.Gender.Male);

	const formattedTotaFemaleCount =
		femaleCount.length > 0
			? createGenderCountObject(DoctorsModelProperties.Gender.Female, parseInt(femaleCount[0].total))
			: createGenderCountObject(DoctorsModelProperties.Gender.Female);

	formattedGenderCount.push(formattedTotalMaleCount, formattedTotaFemaleCount);

	return formattedGenderCount;
}

function prepareSpecialtyWithNoCountData(specialtyModel) {
	const preparedSpecialtyCount = {
		specialtyName: specialtyModel.SpecialtyName,
		total: 0
	};

	return preparedSpecialtyCount;
}

function prepareSpecialtyWithCountData(specialtyModel, total) {
	const preparedSpecialtyCount = {
		specialtyName: specialtyModel.SpecialtyName,
		total: parseInt(total)
	};

	return preparedSpecialtyCount;
}

function createGenderCountObject(gender, total = 0) {
	const genderCountObject = { gender: gender, total: total };

	return genderCountObject;
}
module.exports = {
	formatHospitalSpecialtyCount,
	formatHospitalSpecialtyCountByGender,
	formatHospitalGenderCount
};
