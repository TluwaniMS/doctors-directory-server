const DirectoryModelProperties = require('../models/directory-model-properties');

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
				DirectoryModelProperties.Hospitals
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

module.exports = { calculateMunicipalityHospitalCount };
