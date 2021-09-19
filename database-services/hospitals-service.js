const { Hospital } = require('../models/hospital');

async function getAllHospitals() {
	const hospitals = await Hospital.findAll({});

	return hospitals;
}

async function getHospitalsByMunicipality(municipalKey) {
	const hospitals = await Hospital.findAll({
		where: { municipality: municipalKey }
	});

	return hospitals;
}

module.exports = { getAllHospitals, getHospitalsByMunicipality };
