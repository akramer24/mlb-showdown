const Sequelize = require('sequelize');
const db = require('../db');

const UserPitcher = db.define('userPitcher', {
  userId: Sequelize.INTEGER,
  pitcherId: Sequelize.INTEGER
})

module.exports = UserPitcher;