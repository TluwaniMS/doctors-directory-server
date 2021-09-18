const { Hospital } = require('../models/hospital');

async function getAllHospitals() {
	const hospitals = await Hospital.findAll({});

	return hospitals;
}

module.exports = { getAllHospitals };
