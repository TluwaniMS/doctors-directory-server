const port = process.env.PORT || 3000;
const dbPassword = process.env.DB_PASSWORD;
const dbUserName = process.env.DB_USERNAME;

module.exports = {
	port,
	dbPassword,
	dbUserName
};
