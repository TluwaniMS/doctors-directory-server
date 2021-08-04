const { DataTypes } = require('sequelize');
const { sequelize } = require('../database-config');
const { Municipality } = require('./municipality');

const Hospital = sequelize.define('Hospital', {
	hospitalName: { type: DataTypes.STRING, allowNull: false },
	hospitalKey: { type: DataTypes.STRING, allowNull: false, primaryKey: true }
});

Hospital.belongsTo(Municipality);

Municipality.hasMany(Hospital, {
	foreignKey: 'municipality',
	onDelete: 'SET NULL',
	onUpdate: 'CASCADE'
});

module.exports = { Hospital };
