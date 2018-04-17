const router = require('express').Router();
const { User, UserBatter, UserPitcher, Batter, Pitcher } = require('../db/models');
const db = require('../db');
const buyPack = require('../utils/buyPack');
const {isLoggedIn, isAdmin, isAdminOrSelf, isSelf } = require('./utils/gatekeeperMiddleware');
module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll({ attributes: { exclude: ['googleId', 'email', 'isAdmin']}})
    .then(users => res.json(users))
    .catch(next);
})

router.get('/:userId', (req, res, next) => {
  User.findById(Number(req.params.userId), { attributes: { exclude: ['googleId', 'email', 'isAdmin', 'mostRecentLineup', 'mostRecentRotation']}})
    .then(user => res.json(user))
    .catch(next);
})

router.get('/:userId/batters', async (req, res, next) => {
  const userBatters = await UserBatter.findAll({ where: { userId: Number(req.params.userId) } })
  const batters = userBatters.map(async userBatter => {
    const foundBatter = await Batter.findById(userBatter.batterId)
    foundBatter.dataValues.quantity = userBatter.quantity;
    return foundBatter;
  })
  const result = await Promise.all(batters);
  res.json(result);
})

router.get('/:userId/pitchers', async (req, res, next) => {
  const userPitchers = await UserPitcher.findAll({ where: { userId: Number(req.params.userId) } })
  const pitchers = userPitchers.map(async userPitcher => {
    const foundPitcher = await Pitcher.findById(userPitcher.pitcherId)
    foundPitcher.dataValues.quantity = userPitcher.quantity;
    return foundPitcher;
  })
  const result = await Promise.all(pitchers);
  res.json(result);
})

router.get('/:userId/lineup', (req, res, next) => {
  User.findById(Number(req.params.userId))
    .then(user => res.json(user.mostRecentLineup))
    .catch(next);
})

router.get('/:userId/rotation', (req, res, next) => {
  User.findById(Number(req.params.userId))
    .then(user => res.json(user.mostRecentRotation))
    .catch(next);
})

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.send(user))
    .catch(next);
})

router.post('/:userId/buy-pack', isSelf, (req, res, next) => {
  User.findById(Number(req.params.userId))
    .then(user => buyPack(user.id))
    .then(pack => res.json(pack))
    .catch(next)
})

router.put('/:userId', isAdminOrSelf, (req, res, next) => {
  User.findById(Number(req.params.userId))
    .then(user => user.update(req.body))
    .then(updatedUser => res.json(updatedUser))
    .catch(next);
})

router.put('/:userId/lineup', isSelf, (req, res, next) => {
  User.findById(Number(req.params.userId))
    .then(user => user.update(req.body))
    .then(updatedUser => res.json(updatedUser.mostRecentLineup))
    .catch(next);
})

router.put('/:userId/rotation', isSelf, (req, res, next) => {
  User.findById(Number(req.params.userId))
    .then(user => user.update(req.body))
    .then(updatedUser => res.json(updatedUser.mostRecentRotation))
    .catch(next);
})

router.delete('/:userId/remove-batter/:batterId', isAdminOrSelf, (req, res, next) => {
  UserBatter.destroy({
    where: {
      userId: req.params.userId,
      batterId: req.params.batterId
    }
  })
    .then(() => res.sendStatus(204).end())
    .catch(next);
})

router.delete('/:userId/remove-pitcher/:pitcherId', isAdminOrSelf, (req, res, next) => {
  UserPitcher.destroy({
    where: {
      userId: req.params.userId,
      pitcherId: req.params.pitcherId
    }
  })
    .then(() => res.sendStatus(204).end())
    .catch(next);
})