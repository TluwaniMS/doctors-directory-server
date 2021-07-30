const bcrypt = require('bcrypt');
const { saltRounds } = require('../config-keys/config-keys');

function generateSalt() {
	const salt = bcrypt.genSaltSync(saltRounds);

	return salt;
}

function createPasswordHash(password) {
	const salt = generateSalt();
	const hashedValue = bcrypt.hashSync(password, salt);

	return hashedValue;
}

function comparePassword(hashedPassword, submittedPassword) {
	const passwordsMatch = bcrypt.compareSync(
		submittedPassword,
		hashedPassword
	);

	return passwordsMatch;
}

module.exports = { createPasswordHash, comparePassword };
