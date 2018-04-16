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
      year: 2002,
      onBase: 9,
      SO: [1, 2,3],
      GB: [4, 5],
      FB: [6,7],
      BB: [8,9],
      single: [10, 11, 12, 13, 14, 15, 16],
      double: [17],
      triple: [18],
      homeRun: [19, 20],
      speed: 18,
      bats: 'Right',
      position: '2B',
      image: 'http://www.tradingcarddb.com/Images/Cards/Baseball/8121/8121-301245Fr.jpg'
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

    {
        firstName: 'Hank',
        lastName: 'Blalock',
        year: 2003,
        onBase: 13,
        SO: [1,2],
        GB: [3,4],
        FB: [5,6,7],
        BB: [8,9,10],
        single: [11,12,13,14,15,16,17],
        double: [18],
        homeRun: [19,20],
        speed: 10,
        bats: 'Left',
        position: '3B',
        image: 'http://www.showdowncards.com/images/product/mlb_2003_pennant_run/4700MLB3PR096.jpg'
    },

    {
      firstName: 'Shannon',
      lastName: 'Stewart',
      year: 2002,
      onBase: 11,
      GB: [1,2,3,4],
      FB: [5,6],
      BB: [7,8,9],
      single: [10,11,12,13,14,15,16],
      singlePlus: [17],
      double: [18,19],
      triple: [20],
      speed: 19,
      bats: 'Right',
      position: 'LF/RF',
      image: 'https://img.comc.com/i/Baseball/2002/MLB-Showdown---Base/355/Shannon-Stewart.jpg?id=a7004159-c63e-4f27-9549-5645f021604f&size=biggerthumb'
  },

    {
      firstName: 'Derek',
      lastName: 'Jeter',
      year: 2002,
      onBase: 12,
      SO: [1,2],
      GB: [3,4,5],
      FB: [6,7],
      BB: [8,9,10,11,12,13],
      single: [14,15,16],
      singlePlus: [17],
      double: [18],
      triple: [19],
      homeRun: [20],
      speed: 19,
      bats:'Right',
      position: 'SS',
      image: 'https://img.beckett.com/images/items_stock/185223/4552710/4552791/front.jpg'
  },

  {
    firstName: 'Carlos',
    lastName: 'Beltran',
    year: 2002,
    onBase: 11,
    SO: [1,2],
    GB: [3,4],
    FB: [5,6],
    BB: [7,8,9],
    single: [10,11,12,13,14,15],
    singlePlus: [16],
    double: [17],
    triple: [18],
    homeRun: [19, 20],
    speed:22,
    bats: 'Switch',
    position: 'CF',
    image: 'http://www.showdowncards.com/images/product/2896MLB21B156.jpg'
},

{
  firstName: 'Mike',
  lastName: 'Cameron',
  year: 2003,
  onBase: 10,
  SO: [1,2,3],
  GB: [4,5],
  FB: [6,7],
  BB: [8,9,10,11,12],
  single: [13,14,15],
  singlePlus: [16,17],
  double: [18],
  homeRun: [19, 20],
  speed: 19,
  bats: 'Right',
  position: 'CF',
  image: 'http://www.showdowncards.com/images/product/mlb2003_base_set/4486MLB3BS261.jpg'
},

{
  firstName: 'Mike',
  lastName: 'Piazza',
  year: 2003,
  onBase: 10,
  SO: [1],
  GB: [2,3],
  FB: [4,5,6],
  BB: [7,8,9,10],
  single: [11,12,13,14,15,16],
  double: [17,18],
  homeRun: [19,20],
  speed: 8,
  bats: 'Right',
  position: 'C',
  image: 'https://i.pinimg.com/736x/63/15/93/6315937fbc5624686a5610f8034f9fb2--mike-piazza-mike-dantoni.jpg'
},

{
  firstName: 'Mark',
  lastName: 'McGwire',
  year: 2001,
  onBase: 10,
  SO: [1,2],
  BB: [3,4,5,6,7,8,9,10,11,12],
  single: [13,14],
  double: [15],
  homeRun: [16,17,18,19,20],
  speed: 10,
  bats: 'Right',
  position: '1B',
  image: 'https://i.pinimg.com/236x/17/46/57/174657a8a931d8aae7547e7dbb88235e--baseball-cards-card-games.jpg'
},

{
  firstName: 'Ken',
  lastName: 'Griffey Jr.',
  year: 2002,
  onBase: 13,
  SO: [1,2,3,4],
  GB: [5],
  FB: [6,7],
  BB: [8,9,10,11, 12],
  single: [13,14],
  singlePlus: [15],
  double: [16],
  homeRun: [17,18,19,20],
  speed: 15,
  bats: 'Left',
  position: 'CF',
  image: 'https://i.ebayimg.com/images/g/yFwAAOSwt4xaXRWC/s-l300.jpg'
},

{
  firstName: 'Barry',
  lastName: 'Bonds',
  year: 2002,
  onBase: 14,
  SO: [1,2],
  GB: [3],
  FB: [4,5],
  BB: [6,7,8,9,10,11,12,13],
  single: [14],
  double: [15,16],
  homeRun: [17,18,19,20],
  speed: 14,
  bats: 'Left',
  position: 'LF/RF',
  image: 'http://www.showdowncards.com/images/product/3023MLB21B283.jpg'
},

{
  firstName: 'Kenny',
  lastName: 'Lofton',
  year: 2002,
  onBase: 12,
  SO: [1],
  GB: [2,3],
  FB: [4,5,6,7],
  BB: [8,9,10,11],
  single: [12,13,14,15,16],
  singlePlus: [17],
  double: [18],
  triple: [19],
  homeRun: [20],
  speed: 20,
  bats: 'Left',
  position: 'CF',
  image: 'https://img.comc.com/i/Baseball/2002/MLB-Showdown-Pennant-Run---Base/024/Kenny-Lofton.jpg?id=369b4370-c022-403f-8432-d7503f4743dc&size=original'
},

{
  firstName: 'Chipper',
  lastName: 'Jones',
  year: 2002,
  onBase: 13,
  SO: [1,2,3],
  GB: [4,5],
  FB: [6],
  BB: [7,8,9,10,11,12],
  single: [13,14],
  singlePlus: [15],
  double: [16,17],
  triple: [18],
  homeRun: [19,20],
  speed: 15,
  bats: 'Switch',
  position: '3B',
  image: 'http://www.showdowncards.com/images/product/3921MLB2PR105.jpg'
},

{
  firstName: 'Sammy',
  lastName: 'Sosa',
  year: 2002,
  onBase: 12,
  SO: [1,2,3,4],
  FB: [5],
  BB: [6,7,8,9,10],
  single: [11,12,13,14],
  double: [15,16],
  homeRun: [17,18,19,20],
  speed: 13,
  bats: 'Right',
  position: 'LF/RF',
  image: 'http://www.showdowncards.com/images/product/2811MLB21B071.jpg'
},

{
  firstName: 'Jeremy',
  lastName: 'Giambi',
  year: 2002,
  onBase: 12,
  SO: [1,2,3,4],
  GB: [5],
  FB: [6],
  BB: [7,8,9,10,11,12],
  single: [13,14,15,16],
  double: [17,18],
  homeRun: [19,20],
  speed: 15,
  bats: 'Left',
  position: 'LF/RF',
  image: 'https://i.ebayimg.com/images/g/MWIAAOSw~QdZ0a3M/s-l300.jpg'
},

{
  firstName: 'Darrin',
  lastName: 'Fletcher',
  year: 2002,
  onBase: 7,
  GB: [1,2],
  FB: [3,4,5],
  BB: [6,7],
  single: [8,9,10,11,12,13,14,15,16],
  double: [17,18],
  homeRun: [19,20],
  speed: 9,
  bats: 'Left',
  position: 'C',
  image: 'https://img.comc.com/i/Baseball/2002/MLB-Showdown---Base/348/Darrin-Fletcher.jpg?id=af1195e0-5eb6-4d70-9d5d-ff0b4edb5670&size=original'
},

{
  firstName: 'Ricky',
  lastName: 'Gutierrez',
  year: 2002,
  onBase: 11,
  GB: [1,2,3,4,5,6],
  FB: [7],
  BB: [8,9,10,11],
  single: [12,13,14,15,16,17,18],
  double: [19],
  homeRun: [20],
  speed: 15,
  bats: 'Right',
  position: 'SS',
  image: 'http://www.tradingcarddb.com/Images/Cards/Baseball/8126/8126-9Fr.jpg'
},

{
  firstName: 'Jimmy',
  lastName: 'Rollins',
  year: 2002,
  onBase: 10,
  SO: [1,2],
  GB: [3,4],
  FB: [5,6,7],
  BB: [8, 9],
  single: [10,11,12,13,14,15],
  singlePlus: [16,17],
  double: [18],
  triple: [19],
  homeRun: [20],
  speed: 22,
  bats: 'Switch',
  position: 'SS',
  image: 'https://d1w8cc2yygc27j.cloudfront.net/-7863174030107403235/8274065666512089443_thumbnail.jpg'
},

{
  firstName: 'Jeff',
  lastName: 'Bagwell',
  year: 2002,
  onBase: 12,
  SO: [1,2,3],
  GB: [4,5],
  FB: [6],
  BB: [7,8,9,10,11,12],
  single: [13,14,15,16],
  double: [17,18],
  homeRun: [19,20],
  speed: 14,
  bats: 'Right',
  position: '1B',
  image: 'https://d9nvuahg4xykp.cloudfront.net/-9007235454908130512/-9054051150765312355_thumbnail.jpg'
},

{
  firstName: 'David',
  lastName: 'Justice',
  year: 2002,
  onBase: 10,
  SO: [1,2,3],
  GB: [4,5,6],
  FB: [7],
  BB: [8,9,10,11,12],
  single: [13,14,15,16,17],
  double: [18],
  homeRun: [19,20],
  speed: 12,
  bats: 'Left',
  position: 'DH',
  image: 'http://www.tradingcarddb.com/Images/Cards/Baseball/8126/8126-301612Fr.jpg'
},

{
  firstName: 'Marlon',
  lastName: 'Anderson',
  year: 2002,
  onBase: 10,
  GB: [1,2,3,4,5],
  FB: [6],
  BB: [7,8],
  single: [9,10,11,12,13,14,15,16,17],
  double: [18,19],
  homeRun: [20],
  speed: 15,
  bats: 'Left',
  position: '2B',
  image: 'http://www.tradingcarddb.com/Images/Cards/Baseball/8121/8121-301154Fr.jpg'
},

{
  firstName: 'Frank',
  lastName: 'Thomas',
  year: 2002,
  onBase: 12,
  SO: [1],
  GB: [2],
  FB: [3,4,5,6],
  BB: [7,8,9,10,11,12],
  single: [13,14,15,16],
  double: [17,18],
  homeRun: [19,20],
  speed: 12,
  bats: 'Right',
  position: 'DH',
  image: 'http://www.showdowncards.com/images/product/mlb_2002_tradingdeadline/3230MLB2TR077.jpg'
},

{
  firstName: 'Tsuyoshi',
  lastName: 'Shinjo',
  year: 2002,
  onBase: 9,
  SO: [1,2],
  GB: [3,4],
  FB: [5,6],
  BB: [7,8,9],
  single: [10,11,12,13,14,15,16,17],
  double: [18,19],
  homeRun: [20],
  speed: 13,
  bats: 'Right',
  position: 'OF',
  image: 'http://www.tradingcarddb.com/Images/Cards/Baseball/8121/8121-301124Fr.jpg'
},

{
  firstName: 'Craig',
  lastName: 'Counsell',
  year: 2002,
  onBase: 11,
  SO: [1,2],
  GB: [3,4,5,6],
  FB: [7],
  BB: [8,9,10,11,12],
  single: [13,14,15,16,17,18,19],
  double: [20],
  speed: 16,
  bats: 'Left',
  position: '2B/SS',
  image: 'http://www.tradingcarddb.com/Images/Cards/Baseball/8121/8121-300918Fr.jpg'
},

{
  firstName: 'Shawn',
  lastName: 'Green',
  year: 2002,
  onBase: 11,
  SO: [1,2],
  GB: [3,4,5],
  FB: [6],
  BB: [7,8,9,10],
  single: [11,12,13,14],
  singlePlus: [15],
  double: [16,17],
  homeRun: [18,19,20],
  speed: 18,
  bats: 'Left',
  position: 'LF/RF',
  image: 'http://www.tradingcarddb.com/Images/Cards/Baseball/8121/8121-301072Fr.jpg'
},

// {
//   firstName:
//   lastName:
//   year:
//   onBase:
//   SO:
//   GB:
//   FB:
//   BB:
//   single:
//   singlePlus:
//   double:
//   triple:
//   homeRun:
//   speed:
//   bats:
//   position:
//   image:
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
      image: 'http://www.showdowncards.com/images/product/3923MLB2PR107.jpg',
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
    },

    {
      firstName: 'Mark',
      lastName: 'Mulder',
      year: 2002,
      control: 3,
      PU: [1,2,3],
      SO: [4,5,6,7],
      GB: [8,9,10,11,12,13,14,15],
      FB: [16,17,18],
      single: [19, 20],
      IP: 7,
      throws: 'Left',
      position: 'SP',
      image: 'http://www.tradingcarddb.com/Images/Cards/Baseball/8121/8121-301149Fr.jpg',
    },

    {
      firstName: 'Tom',
      lastName: 'Glavine',
      year: 2002,
      control: 2,
      PU: [1,2,3,4],
      SO: [5,6,7,8,9,10],
      GB: [11,12,13,14,15],
      FB: [16,17,18,19],
      single: [20],
      IP: 7,
      throws: 'Left',
      position: 'SP',
      image: 'https://i.ebayimg.com/images/g/4fUAAOSwa81aOz-r/s-l300.jpg',
    },

    {
      firstName: 'Roy',
      lastName: 'Halladay',
      year: 2002,
      control: 5,
      PU: [1,2],
      SO: [3,4,5,6,7],
      GB: [8,9,10,11,12,13,14,15],
      FB: [16,17],
      single: [18,19],
      double: [20],
      IP: 7,
      throws: 'Right',
      position: 'SP',
      image: 'https://i.ebayimg.com/images/g/Li0AAOSwO7haTJe0/s-l300.jpg',
    },

    {
      firstName: 'Roger',
      lastName: 'Clemens',
      year: 2002,
      control: 5,
      PU: [1,2],
      SO: [3,4,5,6,7,8],
      GB: [9,10,11,12,13],
      FB: [14,15,16],
      BB: [17],
      single: [18,19],
      double: [20],
      IP: 7,
      throws: 'Right',
      position: 'SP',
      image: 'https://i.ebayimg.com/images/g/oQAAAOSwX61ZLJut/s-l300.jpg',
    },

    {
      firstName: 'Roy',
      lastName: 'Oswalt',
      year: 2002,
      control: 2,
      PU: [1,2,3],
      SO: [4,5,6,7,8,9,10],
      GB: [11,12,13,14,15,16],
      FB: [17,18,19],
      single: [20],
      IP: 7,
      throws: 'Right',
      position: 'SP',
      image: 'https://d1w8cc2yygc27j.cloudfront.net/-8381687857259894099/-7283304422972728661_thumbnail.jpg'
    },

    {
      firstName: 'Steve',
      lastName: 'Kline',
      year: 2002,
      control: 4,
      PU: [1,2,3,4],
      SO: [5,6,7,8],
      GB: [9,10,11,12,13,14,15],
      FB: [16,17,18],
      BB: [19],
      single: [20],
      IP: 1,
      throws: 'Left',
      position: 'RP',
      image: 'http://www.tradingcarddb.com/Images/Cards/Baseball/8121/8121-301215Fr.jpg'
    },

    {
      firstName: 'Miguel',
      lastName: 'Batista',
      year: 2002,
      control: 4,
      PU: [1,2,3],
      SO: [4,5,6],
      GB: [7,8,9,10,11,12,13],
      FB: [14,15,16],
      BB: [17,18],
      single: [19,20],
      IP: 6,
      throws: 'Right',
      position: 'SP',
      image: 'http://www.tradingcarddb.com/Images/Cards/Baseball/8121/8121-300916Fr.jpg'
    },

    {
      firstName: 'Braden',
      lastName: 'Looper',
      year: 2002,
      control: 1,
      PU: [1,2,3],
      SO: [4,5,6,7,8],
      GB: [9,10,11,12,13,14,15,16],
      FB: [17,18,19],
      BB: [20],
      IP: 1,
      throws: 'Right',
      position: 'RP',
      image: 'http://www.tradingcarddb.com/Images/Cards/Baseball/8121/8121-301041Fr.jpg'
    },

    {
      firstName: 'Jeff',
      lastName: 'Zimmerman',
      year: 2002,
      control: 4,
      PU: [1,2,3,4,5],
      SO: [6,7,8,9,10,11],
      GB: [12,13,14],
      FB: [15,16,17,18],
      BB: [19],
      single: [20],
      IP: 1,
      throws: 'Right',
      position: 'Closer',
      image: 'http://www.tradingcarddb.com/Images/Cards/Baseball/8121/8121-301246Fr.jpg'
    },

    {
      firstName: 'Jon',
      lastName: 'Lieber',
      year: 2002,
      control: 5,
      PU: [1,2,3],
      SO: [4,5,6],
      GB: [7,8,9,10,11,12],
      FB: [13,14,15,16],
      single: [17,18,19],
      double: [20],
      IP: 7,
      throws: 'Right',
      position: 'SP',
      image: 'http://www.tradingcarddb.com/Images/Cards/Baseball/8121/8121-300970Fr.jpg'
    },

    {
      firstName: 'Albie',
      lastName: 'Lopez',
      year: 2002,
      control: 3,
      PU: [1,2,3,4],
      SO: [5,6,7],
      GB: [8,9,10,11,12,13],
      FB: [14,15,16],
      BB: [17],
      single: [18,19],
      double: [20],
      IP: 6,
      throws: 'Right',
      position: 'SP',
      image: 'http://www.showdowncards.com/images/product/2763MLB21B023.jpg'
    },

    {
      firstName: 'Buddy',
      lastName: 'Groome',
      year: 2002,
      control: 2,
      PU: [1,2,3,4],
      SO: [5,6,7,8,9],
      GB: [10,11,12,13,14,15,16],
      FB: [17,18,19],
      single: [20],
      IP: 1,
      throws: 'Left',
      position: 'RP',
      image: 'http://www.tradingcarddb.com/Images/Cards/Baseball/8121/8121-300946Fr.jpg'
    },

    {
      firstName: 'Graame',
      lastName: 'Lloyd',
      year: 2002,
      control: 5,
      PU: [1,2],
      SO: [3,4,5],
      GB: [6,7,8,9,10,11,12],
      FB: [13,14,15],
      BB: [16],
      single: [17,18,19],
      double: [20],
      IP: 1,
      throws: 'Left',
      position: 'RP',
      image: 'http://www.tradingcarddb.com/Images/Cards/Baseball/8121/8121-301108Fr.jpg'
    },

    {
      firstName: 'Esteban',
      lastName: 'Loaiza',
      year: 2002,
      control: 3,
      PU: [1,2,3],
      SO: [4,5,6],
      GB: [7,8,9,10,11,12],
      FB: [13,14,15,16],
      single: [17,18,19],
      double: [20],
      IP: 6,
      throws: 'Right',
      position: 'SP',
      image: 'http://www.tradingcarddb.com/Images/Cards/Baseball/8121/8121-301255Fr.jpg'
    },

    {
      firstName: 'Antonio',
      lastName: 'Alfonseca',
      year: 2002,
      control: 2,
      PU: [1,2],
      SO: [3,4,5,6],
      GB: [7,8,9,10,11,12,13,14,15],
      FB: [16,17,18],
      single: [19,20],
      double: [],
      IP: 1,
      throws: 'Right',
      position: 'Closer',
      image: 'http://www.tradingcarddb.com/Images/Cards/Baseball/8121/8121-301034Fr.jpg'
    }

    // {
    //   firstName: '',
    //   lastName: '',
    //   year: ,
    //   control: ,
    //   PU: [],
    //   SO: [],
    //   GB: [],
    //   FB: [],
    //   BB: [],
    //   single: [],
    //   double: [],
    //   homeRun: [],
    //   IP: ,
    //   throws: '',
    //   position: '',
    //   image: ''
    // }
  ],

  users: [
    {
      firstName: 'Ari',
      lastName: 'Kramer',
      email: 'arikramer24@gmail.com',
      password: 'Cosmo14!',
      teamName: 'Diggity Dingers',
      isAdmin: true
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