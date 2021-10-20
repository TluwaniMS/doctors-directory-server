const ArrayOfSpecialtyModelProperties = require('../model-properties/array-of-specialty-model-properties');

function addSpecialtyNamesToSpecialties(specialties) {
	const specialtiesWithNamesAttached = [];

	ArrayOfSpecialtyModelProperties.forEach((specialty) => {
		const linkedSpecialty = specialties.filter(
			(specialtyStat) =>
				specialtyStat.specialty === specialty.SpecialtyKey
		)[0];

		linkedSpecialty.specialtyName = specialty.SpecialtyName;
		linkedSpecialty.total = parseInt(linkedSpecialty.total);

		specialtiesWithNamesAttached.push(linkedSpecialty);
	});

	return specialtiesWithNamesAttached;
}

function formatTotalGroupedGenderCount(groupedGenderCount) {
	const preparedGenderCount = [];

	groupedGenderCount.forEach((count) => {
		count.total = parseInt(count.total);
		preparedGenderCount.push(count);
	});

	return preparedGenderCount;
}

module.exports = {
	addSpecialtyNamesToSpecialties,
	formatTotalGroupedGenderCount
};
