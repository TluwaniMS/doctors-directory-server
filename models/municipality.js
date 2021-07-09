const { DataTypes } = require('sequelize');
const { sequelize } = require('../database-config');

const Municipality = sequelize.define('Municipality');

module.exports = Municipality;
