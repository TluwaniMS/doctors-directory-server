const { DataTypes } = require('sequelize');
const { sequelize } = require('../database-config');
const { Municipality } = require('./municipality');

const Hospital = sequelize.define('Hospital', {
	hospitalName: { type: DataTypes.STRING, allowNull: false },
	hospitalKey: { type: DataTypes.STRING, allowNull: false, primaryKey: true }
});

Municipality.hasMany(Hospital, { foreignKey: 'municipality' });
Hospital.belongsTo(Municipality);

await Hospital.sync({ force: true });
module.exports = { Hospital };
