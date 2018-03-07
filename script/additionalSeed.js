const { Batter, Pitcher, User, UserBatter } = require('../server/db/models');
const db = require('../server/db');

const data = {
  teamAriBatters: [1, 2, 3, 4, 5, 7, 8, 15, 11],
  teamJesseBatters: [8, 10, 14, 15, 13, 3, 12, 2, 4]
}

async function addBatters() {
  try {
    const ari = await User.findById(1);
    console.log(ari)
    await data.teamAriBatters.forEach(batterId => ari.addBatter({ id: batterId }))
  } catch (err) {
    console.error(err)
  }
}

addBatters();