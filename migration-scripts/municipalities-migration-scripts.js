const { Municipality } = require('../models/municipality');
const { municipalities } = require('../sample-data/municipalities');

async function createSampleMunicipalities() {
	await Municipality.bulkCreate(municipalities);
}

module.exports = { createSampleMunicipalities };
