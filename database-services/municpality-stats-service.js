const { Municipality } = require('../models/municipality');
const { Hospital } = require('../models/hospital');
const { Doctor } = require('../models/doctor');
const { sequelize } = require('../database-config');

async function getMunicipalitiesWithGenderCountStats() {
	const genderCountGroupedByMunicipality = await Municipality.findAll({
		attributes: ['municipalityName'],
		include: [
			{
				model: Hospital,
				attributes: ['hospitalName'],
				include: [
					{
						model: Doctor,
						attributes: ['gender']
					}
				]
			}
		]
	});

	return genderCountGroupedByMunicipality;
}


module.exports = { getMunicipalitiesWithGenderCountStats };
