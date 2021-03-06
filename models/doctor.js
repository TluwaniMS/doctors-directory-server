const { DataTypes } = require('sequelize');
const { sequelize } = require('../database-config');
const { Hospital } = require('./hospital');
const { Specialisation } = require('./specialisation');

const Doctor = sequelize.define('Doctor', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	firstName: { type: DataTypes.STRING, allowNull: false },
	lastName: { type: DataTypes.STRING, allowNull: false },
	gender: {
		type: DataTypes.ENUM,
		allowNull: false,
		values: ['Male', 'Female']
	},
	password: { type: DataTypes.STRING, allowNull: false },
	email: { type: DataTypes.STRING, allowNull: false }
});

Doctor.belongsTo(Hospital);

Doctor.belongsTo(Specialisation);

Hospital.hasMany(Doctor, {
	foreignKey: 'hospital',
	onDelete: 'SET NULL',
	onUpdate: 'CASCADE'
});

Specialisation.hasMany(Doctor, { foreignKey: 'specialty' });

module.exports = { Doctor };
