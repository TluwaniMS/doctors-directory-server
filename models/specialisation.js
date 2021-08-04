const { DataTypes } = require('sequelize');
const { sequelize } = require('../database-config');

const Specialisation = sequelize.define('Specialisation', {
	specialisationName: { type: DataTypes.STRING, allowNull: false },
	specialisationKey: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true
	}
});

module.exports = { Specialisation };
