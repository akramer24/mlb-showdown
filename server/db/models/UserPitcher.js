const Sequelize = require('sequelize');
const db = require('../db');

const UserPitcher = db.define('userPitcher', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    unique: false
  },
  pitcherId: {
    type: Sequelize.INTEGER,
    unique: false
  }
})

module.exports = UserPitcher;