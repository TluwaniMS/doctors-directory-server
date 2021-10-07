const { Municipality } = require('../models/municipality');
const { Hospital } = require('../models/hospital');
const { sequelize } = require('../database-config');

async function getMunicipalitiesWithGenderCountStats() {
	const genderCountGroupedByMunicipality = await Municipality.findAll({
		attributes: ['municipalityName'],
		include: [
			{
				model: Hospital,
				attributes: ['hospitalName']
			}
		]
	});

	return genderCountGroupedByMunicipality;
}
module.exports = { getMunicipalitiesWithGenderCountStats };
