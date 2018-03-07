const router = require('express').Router();
const { Pitcher } = require('../db/models');
const db = require('../db');

router.get('/', (req, res, next) => {
    Pitcher.findAll({
        order: [
            ['lastName', 'ASC']
        ]
    })
        .then(pitchers => res.send(pitchers))
        .catch(next);
})

router.get('/:pitcherId', (req, res, next) => {
    Pitcher.findById(req.params.pitcherId)
        .then(pitcher => res.send(pitcher))
        .catch(next);
})

module.exports = router;