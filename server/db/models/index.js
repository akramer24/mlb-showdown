const User = require('./user');
const Batter = require('./Batter');
const Pitcher = require('./Pitcher');
const UserBatter = require('./UserBatter');
const UserPitcher = require('./UserPitcher');

// Batter.belongsToMany(User, { through: UserBatter })
// User.hasMany(Batter)
// Pitcher.belongsToMany(User, { through: UserPitcher })
// User.hasMany(Pitcher)

module.exports = {
  User,
  Batter,
  Pitcher,
  UserBatter,
  UserPitcher
}
