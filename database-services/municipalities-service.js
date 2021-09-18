const { Municipality } = require('../models/municipality');

async function getAllMunicipalities() {
	const municipalities = await Municipality.findAll({});

	return municipalities;
}

module.exports = { getAllMunicipalities };
