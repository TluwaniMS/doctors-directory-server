const port = process.env.PORT || 3000;
const dbPassword = process.env.DB_PASSWORD;
const dbUserName = process.env.DB_USERNAME;
const saltRounds = process.env.SALT_ROUNDS;

module.exports = {
	port,
	dbPassword,
	dbUserName,
	saltRounds
};
