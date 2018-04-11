const { expect } = require('chai');
const request = require('supertest');
const db = require('../../db');
const app = require('../../index');
const { Batter } = require('../../db/models');

describe('Batter routes', () => {
  beforeEach(async () => {
    await db.sync({ force: true });
    await Batter.create({ firstName: 'Gary', lastName: 'Sheffield', year: 2002, onBase: 14 });
    await Batter.create({ firstName: 'Jason', lastName: 'Giambi', year: 2003, onBase: 13 });
  })
  
  describe('can get all batters', () => {
    it('GET /api/batters status is 200', () => {
      return request(app)
        .get('/api/batters')
        .expect(200)
    })
    
    it('GET /api/batters response is an array', () => {
      return request(app)
        .get('/api/batters')
        .then(res => expect(res.body).to.be.an('array'))
    })

    it('GET /api/batters array is sorted alphabetically by element\'s lastName', () => {
      return request(app)
        .get('/api/batters')
        .then(res => expect(res.body[0].lastName).to.be.equal('Giambi'))
    })

    it('GET /api/batters responds with all the batters', () => {
      return request(app)
        .get('/api/batters')
        .then(res => expect(res.body.length).to.be.equal(2))
    })
  })

  describe('can get one batter', () => {
    it('GET /api/batters/1 status is 200', () => {
      return request(app)
        .get('/api/batters/1')
        .expect(200)
    })

    it('GET /api/batters/1 response is an object', () => {
      return request(app)
        .get('/api/batters/1')
        .then(res => expect(res.body).to.be.an('object'))
    })

    it('GET /api/batters/1 responds with batter id 1', () => {
      return request(app)
        .get('/api/batters/1')
        .then(res => expect(res.body.id).to.be.equal(1))
    })

    it('GET /api/batters/1 responds with firstName "Gary"', () => {
      return request(app)
        .get('/api/batters/1')
        .then(res => expect(res.body.firstName).to.be.equal('Gary'))
    })
  })
})
