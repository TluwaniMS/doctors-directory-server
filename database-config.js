const { Sequelize } = require('sequelize');
const { dbPassword, dbUserName } = require('./config-keys/config-keys');

const sequelize = new Sequelize(
	`postgres://${dbUserName}:${dbPassword}@localhost:5432/doctors-portal`
);

module.exports = { sequelize };
