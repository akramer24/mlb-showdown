const { Batter, Pitcher, User, UserBatter, UserPitcher } = require('../server/db/models');
const db = require('../server/db');

const data = {
  batters: [
    {
      firstName: 'Gary',
      lastName: 'Sheffield',
      year: 2002,
      onBase: 14,
      SO: [1, 2],
      GB: [3],
      FB: [4, 5, 6],
      BB: [7, 8, 9, 10, 11, 12, 13],
      single: [14, 15],
      double: [16, 17],
      homeRun: [18, 19, 20],
      speed: 15,
      bats: 'Right',
      position: 'LF/RF',
      image: 'https://i.ebayimg.com/images/g/qVoAAOSwUEVYDjOi/s-l300.jpg'
    },

    {
      firstName: 'Edgar',
      lastName: 'Martinez',
      year: 2002,
      onBase: 15,
      SO: [1, 2, 3, 4],
      GB: [5, 6],
      FB: [7],
      BB: [8, 9, 10, 11, 12],
      single: [13, 14, 15],
      double: [16, 17, 18, 19],
      homeRun: [20],
      speed: 12,
      bats: 'Right',
      position: '3B',
      image: 'https://shlabotnikreport.files.wordpress.com/2017/02/2002-mlb-showdown-edgar-martinez-super-season.jpg?w=214&h=300'
    },

    {
      firstName: 'Michael',
      lastName: 'Young',
      year: 2003,
      onBase: 12,
      SO: [1, 2],
      GB: [3, 4, 5],
      FB: [6],
      BB: [7, 8],
      single: [9, 10, 11, 12, 13, 14, 15, 16],
      singlePlus: [17],
      double: [18],
      triple: [19],
      homeRun: [20],
      speed: 15,
      bats: 'Right',
      position: '2B',
      image: 'https://i.ebayimg.com/thumbs/images/m/mmpcBd3d5Ne5E_4k8RPyO3g/s-l225.jpg'
    },

    {
      firstName: 'Raul',
      lastName: 'Mondesi',
      year: 2003,
      onBase: 12,
      SO: [1, 2],
      GB: [3],
      FB: [4, 5, 6],
      BB: [7, 8, 9, 10],
      single: [11, 12, 13],
      singlePlus: [14, 15],
      double: [16, 17],
      triple: [18],
      homeRun: [19, 20],
      speed: 22,
      bats: 'Right',
      position: 'LF/RF'
    },

    {
      firstName: 'Rafael',
      lastName: 'Palmeiro',
      year: 2002,
      onBase: 12,
      SO: [1],
      GB: [2, 3],
      FB: [4, 5, 6, 7],
      BB: [8, 9, 10, 11, 12, 13],
      single: [14, 15, 16],
      double: [17],
      homeRun: [18, 19, 20],
      speed: 10,
      bats: 'Left',
      position: '1B',
      image: 'http://www.showdowncards.com/images/product/3078MLB21B338.jpg'
    },

    {
      firstName: 'Fred',
      lastName: 'McGriff',
      year: 2002,
      onBase: 12,
      SO: [1, 2, 3, 4, 5],
      GB: [6],
      FB: [7],
      BB: [8, 9, 10, 11, 12, 13],
      single: [14, 15],
      double: [16, 17],
      homeRun: [18, 19, 20],
      speed: 14,
      bats: 'Left',
      position: '1B',
      image: 'https://i.ebayimg.com/images/g/rH4AAOxyYSdTD0gh/s-l400.jpg'
    },

    {
      firstName: 'Ichiro',
      lastName: 'Suzuki',
      year: 2003,
      onBase: 12,
      SO: [1],
      GB: [2, 3, 4, 5],
      FB: [6, 7],
      BB: [8, 9, 10],
      single: [11, 12, 13],
      singlePlus: [14, 15, 16, 17],
      double: [18],
      triple: [19],
      homeRun: [20],
      speed: 19,
      bats: 'Left',
      position: 'LF/RF',
      image: 'https://i.ebayimg.com/images/g/zosAAOSw~CFY5knp/s-l300.jpg'
    },

    {
      firstName: 'Brian',
      lastName: 'Giles',
      year: 2002,
      onBase: 12,
      GB: [1, 2, 3],
      FB: [4, 5, 6],
      BB: [7, 8, 9, 10, 11],
      single: [12, 13, 14, 15, 16],
      double: [17, 18],
      homeRun: [19, 20],
      speed: 18,
      bats: 'Left',
      position: 'LF/RF',
      image: 'http://www.showdowncards.com/images/product/3002MLB21B262.jpg'
    },

    {
      firstName: 'Christian',
      lastName: 'Guzman',
      year: 2002,
      onBase: 10,
      SO: [1],
      GB: [2, 3, 4, 5],
      FB: [6],
      BB: [7],
      single: [8, 9, 10, 11, 12, 13, 14],
      singlePlus: [15],
      double: [16, 17],
      triple: [18, 19],
      homeRun: [20],
      speed: 22,
      bats: 'Switch',
      position: 'SS',
      image: 'http://www.showdowncards.com/images/product/2929MLB21B189.jpg'
    },

    {
      firstName: 'Ruben',
      lastName: 'Sierra',
      year: 2002,
      onBase: 11,
      SO: [1, 2],
      GB: [3, 4],
      FB: [5, 6, 7],
      BB: [8],
      single: [9, 10, 11, 12, 13, 14],
      double: [15, 16, 17],
      homeRun: [18, 19, 20],
      speed: 13,
      bats: 'Switch',
      position: 'LF/RF',
      image: 'http://www.showdowncards.com/images/product/3843MLB2PR027.jpg'
    },

    {
      firstName: 'Mike',
      lastName: 'Sweeney',
      year: 2003,
      onBase: 13,
      SO: [1],
      GB: [2, 3, 4],
      FB: [5, 6],
      BB: [7, 8, 9, 10],
      single: [11, 12, 13, 14, 15, 16],
      double: [17, 18],
      homeRun: [19, 20],
      speed: 12,
      bats: 'Right',
      position: '1B',
      image: 'https://img.comc.com/i/Baseball/2003/MLB-Showdown---Base/153/Mike-Sweeney.jpg?id=ee2f5a95-e634-4822-b520-e3a618d4de88&size=bigthumb2'
    },

    {
      firstName: 'Jason',
      lastName: 'Giambi',
      year: 2002,
      onBase: 14,
      SO: [1, 2],
      GB: [3, 4],
      FB: [5, 6],
      BB: [7, 8, 9, 10, 11, 12],
      single: [13, 14, 15, 16],
      double: [17, 18],
      homeRun: [19, 20],
      speed: 12,
      bats: 'Left',
      position: '1B',
      image: 'http://www.showdowncards.com/images/product/2980MLB21B240.jpg'
    },

    {
      firstName: 'Barry',
      lastName: 'Larkin',
      year: 2002,
      onBase: 13,
      SO: [1, 2],
      GB: [3, 4, 5],
      FB: [6, 7],
      BB: [8, 9, 10, 11],
      single: [12, 13, 14],
      singlePlus: [15, 16],
      double: [17, 18],
      triple: [19],
      homeRun: [20],
      speed: 20,
      bats: 'Right',
      position: 'SS',
      image: 'http://www.showdowncards.com/images/product/3919MLB2PR103.jpg'
    },

    {
      firstName: 'Manny',
      lastName: 'Ramirez',
      year: 2003,
      onBase: 13,
      SO: [1, 2],
      GB: [3, 4],
      FB: [5, 6],
      BB: [7, 8, 9, 10, 11],
      single: [12, 13, 14, 15, 16],
      double: [17, 18],
      homeRun: [19, 20],
      speed: 8,
      bats: 'Right',
      position: 'LF/RF',
      image: 'http://www.showdowncards.com/images/product/mlb2003_base_set/4284MLB3BS059.jpg'
    },

    {
      firstName: 'Jorge',
      lastName: 'Posada',
      year: 2002,
      onBase: 12,
      SO: [1, 2, 3],
      GB: [4],
      FB: [5, 6],
      BB: [7, 8, 9, 10, 11],
      single: [12, 13, 14, 15],
      double: [16, 17, 18],
      homeRun: [19, 20],
      speed: 12,
      bats: 'Switch',
      position: 'C',
      image: 'http://www.showdowncards.com/images/product/3830MLB2PR014.jpg'
    },

    // {
    //     firstName:
    //     lastName:
    //     year:
    //     onBase:
    //     SO:
    //     GB:
    //     FB:
    //     BB:
    //     single:
    //     singlePlus:
    //     double:
    //     triple:
    //     homeRun:
    //     speed:
    //     bats:
    //     position:
    //     image:
    // },
  ],

  pitchers: [
    {
      firstName: 'Randy',
      lastName: 'Johnson',
      year: 2002,
      control: 5,
      PU: [1, 2],
      SO: [3, 4, 5, 6, 7, 8, 9, 10, 11],
      GB: [12, 13, 14],
      FB: [15, 16],
      BB: [17, 18, 19],
      single: [20],
      IP: 6,
      throws: 'Left',
      position: 'SP',
      image: 'http://thumbs3.ebaystatic.com/d/l225/m/msrARJ4agBIJVLHTvTnQqQg.jpg',
    },

    {
      firstName: 'Hoyt',
      lastName: 'Wilhelm',
      year: 2003,
      control: 6,
      PU: [1, 2],
      SO: [3, 4, 5, 6, 7, 8],
      GB: [9, 10, 11, 12, 13, 14],
      FB: [15, 16, 17],
      BB: [18],
      single: [19, 20],
      IP: 2,
      throws: 'Right',
      position: 'RP',
      image: 'http://www.showdowncards.com/images/product/mlb_2003_pennant_run/4722MLB3PR118.jpg',
    },

    {
      firstName: 'Mariano',
      lastName: 'Rivera',
      year: 2002,
      control: 5,
      PU: [1, 2],
      SO: [3, 4, 5, 6, 7, 8, 9],
      GB: [10, 11, 12, 13, 14, 15, 16],
      FB: [17, 18],
      single: [19, 20],
      IP: 1,
      throws: 'Right',
      position: 'Closer',
      image: 'https://img.comc.com/i/Baseball/2002/MLB-Showdown---Base/233/Mariano-Rivera.jpg?id=7baf1934-059f-4421-9440-d85e3000a5bd&size=biggerthumb',
    },

    {
      firstName: 'Pedro',
      lastName: 'Martinez',
      year: 2002,
      control: 6,
      PU: [1, 2],
      SO: [3, 4, 5, 6, 7, 8, 9, 10, 11],
      GB: [12, 13, 14],
      FB: [15, 16, 17],
      BB: [18],
      single: [19, 20],
      IP: 7,
      throws: 'Right',
      position: 'SP',
      image: 'http://www.showdowncards.com/images/product/3928MLB2PR112.jpg',
    }
  ],

  users: [
    {
      firstName: 'Ari',
      lastName: 'Kramer',
      email: 'arikramer24@gmail.com',
      password: 'Cosmo14!',
      teamName: 'Diggity Dingers'
    },

    {
      firstName: 'Jesse',
      lastName: 'Kramer',
      email: 'jessekramer27@gmail.com',
      password: 'lumpkin',
      teamName: 'Donkey Donko'
    },

    {
      firstName: 'Computer',
      lastName: 'Computer',
      email: 'computer@computer.com',
      password: 'computer',
      teamName: 'Computer'
    }
  ],

  teamAriBatters: [1, 2, 3, 4, 5, 7, 8, 15, 11],
  teamJesseBatters: [8, 10, 14, 15, 13, 3, 12, 2, 4],
  teamComputerBatters: [8, 10, 14, 15, 13, 3, 12, 2, 4],
  teamAriPitchers: [1, 2],
  teamJessePitchers: [3, 4],
  teamComputerPitchers: [1, 4]
}

async function seed() {
  try {
    await db.sync({ force: true });
    await data.batters.forEach(batter => {
      Batter.create(batter)
    })
    await data.pitchers.forEach(pitcher => {
      Pitcher.create(pitcher)
    })
    await data.users.forEach(async user => {
      await User.create(user)
    })
    await data.teamAriBatters.forEach(batterId => {
      UserBatter.create({ userId: 1, batterId })
    })
    await data.teamJesseBatters.forEach(batterId => {
      UserBatter.create({ userId: 2, batterId })
    })
    await data.teamComputerBatters.forEach(batterId => {
      UserBatter.create({ userId: 3, batterId })
    })
    await data.teamAriPitchers.forEach(pitcherId => {
      UserPitcher.create({ userId: 1, pitcherId })
    })
    await data.teamJessePitchers.forEach(pitcherId => {
      UserPitcher.create({ userId: 2, pitcherId })
    })
    await data.teamComputerPitchers.forEach(pitcherId => {
      UserPitcher.create({ userId: 3, pitcherId })
    })
  } catch (err) {
    console.error(err)
  }
}

seed();