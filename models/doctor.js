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

Hospital.hasMany(Doctor, {
	foreignKey: 'hospital',
	onDelete: 'SET NULL',
	onUpdate: 'CASCADE'
});
Doctor.belongsTo(Hospital);

Specialisation.hasMany(Doctor, { foreignKey: 'specialty' });
Doctor.belongsTo(Specialisation);

await Doctor.sync({ force: true });
module.exports = Doctor;
