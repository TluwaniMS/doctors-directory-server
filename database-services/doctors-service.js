const { Doctor } = require('../models/doctor');

async function getAllDoctors() {
	const doctors = Doctor.findAll({
		attributes: [
			'id',
			'firstName',
			'lastName',
			'gender',
			'hospital',
			'specialty'
		]
	});

	return doctors;
}
module.exports = { getAllDoctors };
