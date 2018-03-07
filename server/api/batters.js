const router = require('express').Router();
const { Batter } = require('../db/models');
const db = require('../db');

router.get('/', (req, res, next) => {
    Batter.findAll({
        order: [
            ['lastName', 'ASC']
        ]
    })
        .then(batters => res.send(batters))
        .catch(next);
})

router.get('/:batterId', (req, res, next) => {
    Batter.findById(req.params.batterId)
        .then(batter => res.send(batter))
        .catch(next);
})

module.exports = router;