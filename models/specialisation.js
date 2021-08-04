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

(async () => {
	await Specialisation.sync({ force: true });
})();
module.exports = { Specialisation };
