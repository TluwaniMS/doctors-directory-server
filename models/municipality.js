const { DataTypes } = require('sequelize');
const { sequelize } = require('../database-config');

const Municipality = sequelize.define('Municipality', {
	municipalityName: { type: DataTypes.STRING, allowNull: false },
	municipalityKey: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true
	}
});

module.exports = { Municipality };
