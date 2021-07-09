const { DataTypes } = require('sequelize');
const { sequelize } = require('../database-config');

const Hospital = sequelize.define('Hospital');

module.exports = Hospital;
