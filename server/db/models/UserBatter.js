const Sequelize = require('sequelize');
const db = require('../db');

const UserBatter = db.define('userBatter', {
  userId: Sequelize.INTEGER,
  batterId: Sequelize.INTEGER
})

module.exports = UserBatter;