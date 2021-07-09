const { DataTypes } = require('sequelize');
const { sequelize } = require('../database-config');

const Doctor = sequelize.define('Doctor');

module.exports = Doctor;
