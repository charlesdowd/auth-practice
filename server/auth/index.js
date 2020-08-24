const express = require('express');
const joi = require('joi');

const db = require('../db/connection');
const users = db.get('users');

users.createIndex('username', { unique: true }); 

const router = express.Router();

const schema = joi.object().keys({
    username: joi.string().regex(/^[a-zA-Z0-9_]+$/).min(3).max(30).required(),
    password: joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
})

// any route inside of here is pre-pended with '/auth'

router.get('/', (req, res) => {
    res.json({
        message: "auth router!"
    });
})

router.post('/signup', (req, res) => {
     console.log("body", req.body);
     const result = schema.validate(req.body);
    res.json(result);
});

module.exports = router;