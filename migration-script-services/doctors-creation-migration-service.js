const { createPasswordHash } = require('../services/hashing-service');

function hashDoctorsPasswords(doctors) {
	doctors.forEach((doctor) => {
		let hashedPassword = createPasswordHash(doctor.password);
		doctor.password = hashedPassword;
	});

	return doctors;
}

module.exports = { hashDoctorsPasswords };
