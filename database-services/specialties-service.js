const { Specialisation } = require('../models/specialisation');

async function getAllSpecialties() {
	const specialties = await Specialisation.findAll({});

	return specialties;
}

module.exports = { getAllSpecialties };
