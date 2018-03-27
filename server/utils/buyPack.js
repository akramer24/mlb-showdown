const { Batter, Pitcher, UserBatter, UserPitcher } = require('../db/models');

const buyPack = async userId => {
  const numPitchers = Math.round(Math.random() * 2);
  const allBatters = await Batter.findAll();
  const allPitchers = await Pitcher.findAll();
  const pack = [];
  const pitcherIds = [];
  const batterIds = [];

  for (let i = 0; i < numPitchers; i++) {
    const randomIdx = Math.floor(Math.random() * allPitchers.length);
    const pitcher = allPitchers[randomIdx];
    if (!pitcherIds.includes(pitcher.id)) {
      pitcherIds.push(pitcher.id);
      pack.push(pitcher);
      UserPitcher.find({
        where: {
          userId,
          pitcherId: pitcher.id
        }
      })
        .then(foundPitcher => {
          if (foundPitcher) {
            const quantity = foundPitcher.quantity + 1;
            foundPitcher.update({ quantity })
          }
          else {
            UserPitcher.create({ userId, pitcherId: pitcher.id })
          }
        })
        .catch(console.error);
    }
  }

  for (let i = numPitchers; i < 5; i++) {
    const randomIdx = Math.floor(Math.random() * allBatters.length);
    const batter = allBatters[randomIdx];

    if (!batterIds.includes(batter.id)) {
      batterIds.push(batter.id)
      pack.push(batter);
      UserBatter.find({
        where: {
          userId,
          batterId: batter.id
        }
      })
        .then(foundBatter => {
          if (foundBatter) {
            const quantity = foundBatter.quantity + 1;
            foundBatter.update({ quantity })
          }
          else {
            UserBatter.create({ userId, batterId: batter.id })
          }
        })
        .catch(console.error);
    }
  }
  return pack;
}

module.exports = buyPack;