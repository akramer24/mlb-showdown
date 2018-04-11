/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../../db');
const app = require('../../index');
const { User, UserBatter, UserPitcher, Batter, Pitcher } = require('../../db/models');

describe('User routes', () => {

  beforeEach(async () => {
    await db.sync({ force: true });
    await User.create({ email: 'cody@puppybook.com', teamName: 'cody' });
    await User.create({ email: 'ari@ari.com', teamName: 'diggity' });
    await Batter.create({ firstName: 'Gary', lastName: 'Sheffield', year: 2002, onBase: 14 });
    await Batter.create({ firstName: 'Jason', lastName: 'Giambi', year: 2003, onBase: 13 });
    await Pitcher.create({ firstName: 'Pedro', lastName: 'Martinez', year: 20002, control: 6 });
    await Pitcher.create({ firstName: 'Mariano', lastName: 'Rivera', year: 2002, control: 5 });
    await UserBatter.create({ userId: 1, batterId: 1 });
    await UserBatter.create({ userId: 1, batterId: 2 });
    await UserPitcher.create({ userId: 2, pitcherId: 1 });
    await UserPitcher.create({ userId: 2, pitcherId: 2 });
  })

  describe('users', () => {

    describe('can get all users', () => {
      it('GET /api/users status is 200', () => {
        return request(app)
          .get('/api/users')
          .expect(200);
      })

      it('GET /api/users response is an array', () => {
        return request(app)
          .get('/api/users')
          .then(res => {
            expect(res.body).to.be.an('array');
          })
      })

      it('GET /api/users at index 0 has email value "cody@puppybook.com"', () => {
        return request(app)
          .get('/api/users')
          .then(res => {
            expect(res.body[0].email).to.be.equal('cody@puppybook.com');
          })
      })

      it('GET /api/users at index 1 has teamName value "diggity"', () => {
        return request(app)
          .get('/api/users')
          .then(res => {
            expect(res.body[1].teamName).to.be.equal('diggity');
          })
      })
    })

    describe('can get a specific user', () => {
      it('GET /api/users/2 status is 200', () => {
        return request(app)
          .get('/api/users/2')
          .expect(200)
      })

      it('GET /api/users/2 response is an object', () => {
        return request(app)
          .get('/api/users/2')
          .then(res => {
            expect(res.body).to.be.an('object');
          })
      })

      it('GET /api/users/2 email value is "ari@ari.com"', () => {
        return request(app)
          .get('/api/users/2')
          .then(res => {
            expect(res.body.email).to.be.equal('ari@ari.com');
            expect(res.body.teamName).to.be.equal('diggity');
          })
      })

      it('GET /api/users/2 teamName value is "diggity"', () => {
        return request(app)
          .get('/api/users/2')
          .then(res => {
            expect(res.body.teamName).to.be.equal('diggity');
          })
      })
    })

    describe('can get a user\'s batters', () => {
      it('GET /api/users/1/batters status is 200', () => {
        return request(app)
          .get('/api/users/1/batters')
          .expect(200)
      })

      it('GET /api/users/1/batters response is an array', () => {
        return request(app)
          .get('/api/users/1/batters')
          .then(res => {
            expect(res.body).to.be.an('array');
          })
      })

      it('GET /api/users/1/batters at index 0 id is 1', () => {
        return request(app)
          .get('/api/users/1/batters')
          .then(res => {
            expect(res.body[0].id).to.be.equal(1);
          })
      })

      it('GET /api/users/1/batters at index 0 firstName is "Gary', () => {
        return request(app)
          .get('/api/users/1/batters')
          .then(res => {
            expect(res.body[0].firstName).to.be.equal('Gary');
          })
      })

      it('GET /api/users/1/batters at index 1 lastName is "Giambi', () => {
        return request(app)
          .get('/api/users/1/batters')
          .then(res => {
            expect(res.body[1].lastName).to.be.equal('Giambi');
          })
      })

      it('GET /api/users/undefined/batters status is 200', () => {
        return request(app)
          .get('/api/users/3/batters')
          .expect(200)
      })

      it('GET /api/users/undefined/batters response is an array', () => {
        return request(app)
          .get('/api/users/3/batters')
          .then(res => {
            expect(res.body).to.be.an('array');
          })
      })

      it('GET /api/users/undefined/batters resonds with an array of length 0', () => {
        return request(app)
          .get('/api/users/3/batters')
          .then(res => {
            expect(res.body.length).to.be.equal(0);
          })
      })
    })

    describe('can get a user\'s pitchers', () => {
      it('GET /api/users/2/pitchers status is 200', () => {
        return request(app)
          .get('/api/users/2/pitchers')
          .expect(200)
      })

      it('GET /api/users/2/pitchers response is an array', () => {
        return request(app)
          .get('/api/users/2/pitchers')
          .then(res => {
            expect(res.body).to.be.an('array');
          })
      })

      it('GET /api/users/2/pitchers at index 0 id is 1', () => {
        return request(app)
          .get('/api/users/2/pitchers')
          .then(res => {
            expect(res.body[1].id).to.be.equal(2);
          })
      })

      it('GET /api/users/2/pitchers at index 0 firstName is "Pedro', () => {
        return request(app)
          .get('/api/users/2/pitchers')
          .then(res => {
            expect(res.body[0].firstName).to.be.equal('Pedro');
          })
      })

      it('GET /api/users/2/pitchers at index 1 lastName is "Rivera', () => {
        return request(app)
          .get('/api/users/2/pitchers')
          .then(res => {
            expect(res.body[1].lastName).to.be.equal('Rivera');
          })
      })

      it('GET /api/users/undefined/pitchers status is 200', () => {
        return request(app)
          .get('/api/users/3/pitchers')
          .expect(200)
      })

      it('GET /api/users/undefined/pitchers response is an array', () => {
        return request(app)
          .get('/api/users/3/pitchers')
          .then(res => {
            expect(res.body).to.be.an('array');
          })
      })

      it('GET /api/users/undefined/pitchers resonds with an array of length 0', () => {
        return request(app)
          .get('/api/users/3/pitchers')
          .then(res => {
            expect(res.body.length).to.be.equal(0);
          })
      })
    })

    describe('can create a user', () => {
      it('POST /api/users status is 200', () => {
        return request(app)
          .post('/api/users')
          .send({ email: 'joed@joed.com', firstName: 'Joe', lastName: 'DiMaggio', teamName: 'Marilyn' })
          .expect(200)
      })

      it('POST /api/users response is an object', () => {
        return request(app)
          .post('/api/users')
          .send({ email: 'joed@joed.com', firstName: 'Joe', lastName: 'DiMaggio', teamName: 'Marilyn' })
          .then(res => {
            expect(res.body).to.be.an('object')
          })
      })

      it('POST /api/users response object has corresponding email', () => {
        return request(app)
          .post('/api/users')
          .send({ email: 'joed@joed.com', firstName: 'Joe', lastName: 'DiMaggio', teamName: 'Marilyn' })
          .then(res => {
            expect(res.body.email).to.be.equal('joed@joed.com')
          })
      })
    })

    describe('can edit a user', () => {
      it('PUT /api/users/1 status is 200', () => {
        return request(app)
          .put('/api/users/1')
          .send({ teamName: 'not cody' })
          .expect(200)
      })

      it('PUT /api/users/1 response is an object', () => {
        return request(app)
          .put('/api/users/1')
          .send({ teamName: 'not cody' })
          .then(res => {
            expect(res.body).to.be.an('object')
          })
      })

      it('PUT /api/users/1 response is an object', () => {
        return request(app)
          .put('/api/users/1')
          .send({ teamName: 'not cody' })
          .then(res => {
            expect(res.body.teamName).to.be.equal('not cody')
          })
      })
    })

  })

})
