const DoctorsModelProperties = require('../model-properties/doctors-model-properties');

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

module.exports = { formatSpecialtyCountByGender };
