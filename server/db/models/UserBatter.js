const Sequelize = require('sequelize');
const db = require('../db');

const UserBatter = db.define('userBatter', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
  batterId: {
    type: Sequelize.INTEGER,
  }
})

module.exports = UserBatter;