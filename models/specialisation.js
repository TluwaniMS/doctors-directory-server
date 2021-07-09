const { DataTypes } = require('sequelize');
const { sequelize } = require('../database-config');

const Specialisation = sequelize.define('Specialisation');

module.exports = Specialisation;
