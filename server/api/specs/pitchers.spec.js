const { expect } = require('chai');
const request = require('supertest');
const db = require('../../db');
const app = require('../../index');
const { Pitcher } = require('../../db/models');

describe('Pitcher routes', () => {
  beforeEach(async () => {
    await db.sync({ force: true });
    await Pitcher.create({ firstName: 'Pedro', lastName: 'Martinez', year: 2002, control: 6 });
    await Pitcher.create({ firstName: 'Randy', lastName: 'Johnson', year: 2003, control: 5 });
  })
  
  describe('can get all pitchers', () => {
    it('GET /api/pitchers status is 200', () => {
      return request(app)
        .get('/api/pitchers')
        .expect(200)
    })
    
    it('GET /api/pitchers response is an array', () => {
      return request(app)
        .get('/api/pitchers')
        .then(res => expect(res.body).to.be.an('array'))
    })

    it('GET /api/pitchers array is sorted alphabetically by element\'s lastName', () => {
      return request(app)
        .get('/api/pitchers')
        .then(res => expect(res.body[0].lastName).to.be.equal('Johnson'))
    })

    it('GET /api/pitchers responds with all the pitchers', () => {
      return request(app)
        .get('/api/pitchers')
        .then(res => expect(res.body.length).to.be.equal(2))
    })
  })

  describe('can get one pitcher', () => {
    it('GET /api/pitchers/1 status is 200', () => {
      return request(app)
        .get('/api/pitchers/1')
        .expect(200)
    })

    it('GET /api/pitchers/1 response is an object', () => {
      return request(app)
        .get('/api/pitchers/1')
        .then(res => expect(res.body).to.be.an('object'))
    })

    it('GET /api/pitchers/1 responds with pitcher id 1', () => {
      return request(app)
        .get('/api/pitchers/1')
        .then(res => expect(res.body.id).to.be.equal(1))
    })

    it('GET /api/pitchers/1 responds with firstName "Pedro"', () => {
      return request(app)
        .get('/api/pitchers/1')
        .then(res => expect(res.body.firstName).to.be.equal('Pedro'))
    })
  })
})
