const ArrayOfSpecialtyModelProperties = require('../model-properties/array-of-specialty-model-properties');

function addSpecialtyNamesToSpecialties(specialties) {
	const specialtiesWithNamesAttached = [];

	ArrayOfSpecialtyModelProperties.forEach((specialty) => {
		const linkedSpecialty = specialties.filter(
			(specialtyStat) =>
				specialtyStat.specialty === specialty.SpecialtyKey
		)[0];

		linkedSpecialty.specialtyName = specialty.SpecialtyName;

		specialtiesWithNamesAttached.push(linkedSpecialty);
	});

	return specialtiesWithNamesAttached;
}

module.exports = { addSpecialtyNamesToSpecialties };
