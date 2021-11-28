const bcrypt = require('bcrypt');
const { saltRounds } = require('../config-keys/config-keys');

function createPasswordHash(password) {
	const hashedValue = bcrypt.hashSync(password, parseInt(saltRounds));

	return hashedValue;
}

function comparePassword(hashedPassword, submittedPassword) {
	const passwordsMatch = bcrypt.compareSync(submittedPassword, hashedPassword);

	return passwordsMatch;
}

module.exports = { createPasswordHash, comparePassword };
