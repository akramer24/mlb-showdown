const db = require('../db');
const Sequelize = require('sequelize');
const UserBatter = require('./UserBatter');

const Batter = db.define('batter', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  superSeason: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  allStar: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  onBase: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  SO: Sequelize.ARRAY(Sequelize.INTEGER),
  GB: Sequelize.ARRAY(Sequelize.INTEGER),
  FB: Sequelize.ARRAY(Sequelize.INTEGER),
  BB: Sequelize.ARRAY(Sequelize.INTEGER),
  single: Sequelize.ARRAY(Sequelize.INTEGER),
  singlePlus: Sequelize.ARRAY(Sequelize.INTEGER),
  double: Sequelize.ARRAY(Sequelize.INTEGER),
  triple: Sequelize.ARRAY(Sequelize.INTEGER),
  homeRun: Sequelize.ARRAY(Sequelize.INTEGER),
  speed: Sequelize.INTEGER,
  bats: Sequelize.STRING,
  position: Sequelize.STRING,
  secondaryPosition: Sequelize.STRING,
  image: {
    type: Sequelize.STRING,
    defaultValue: 'https://cdn6.bigcommerce.com/s-0kvv9/images/stencil/1280x1280/products/70292/66725/2003-mlb-showdown-booster-pack-9-cards-14__20186.1461137719.jpg?c=2'
  }
}, {
    getterMethods: {
      name() {
        return this.firstName + ' ' + this.lastName;
      }
    }
  })

module.exports = Batter;