const { Batter, Pitcher, UserBatter, UserPitcher } = require('../db/models');

const buyPack = async userId => {
  const numPitchers = Math.round(Math.random() * 2);
  const allBatters = await Batter.findAll();
  const allPitchers = await Pitcher.findAll();
  const userBatters = await UserBatter.findAll({ where: { userId } });
  const userPitchers = await UserPitcher.findAll({ where: { userId } });
  const pack = [];

  for (let i = 0; i < numPitchers; i++) {
    const randomIdx = Math.floor(Math.random() * allPitchers.length);
    const pitcher = allPitchers[randomIdx];

    pack.push(pitcher);
    UserPitcher.create({ userId, pitcherId: pitcher.id })
      .catch(console.error);
  }

  for (let i = numPitchers; i < 5; i++) {
    const randomIdx = Math.floor(Math.random() * allBatters.length);
    const batter = allBatters[randomIdx];

    pack.push(batter);
    UserBatter.create({ userId, batterId: batter.id })
      .catch(console.error);
  }
  return pack;
}

module.exports = buyPack;