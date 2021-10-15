const ArrayOfSpecialtyModelProperties = require('../model-properties/array-of-specialty-model-properties');

function formatHospitalSpecialtyCount(specialtyCounts) {
	const preparedSpecialtyCounts = [];

	ArrayOfSpecialtyModelProperties.forEach((specialty) => {
		const linkedSpecialty = specialtyCounts.filter(
			(count) => count.specialty === specialty.SpecialtyKey
		);

		const preparedSpecialty =
			linkedSpecialty.length > 0
				? prepareSpecialtyWithCountData(
						specialty,
						linkedSpecialty[0].total
				  )
				: prepareSpecialtyWithNoCountData(specialty);

		preparedSpecialtyCounts.push(preparedSpecialty);
	});

	return preparedSpecialtyCounts;
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

module.exports = { formatHospitalSpecialtyCount };
