const express = require('express');
const joi = require('joi');
const bcrypt = require('bcryptjs');

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

router.post('/signup', (req, res, next) => {
    const result = schema.validate(req.body);
    if (!result.error) {
        // if the username + password fit the schema, check to see already in db
        users.findOne({
            username: req.body.username
        }).then(user => {
            // if we find the user, that username is in use and they can't signup with it
            if (user) {
                const error = new Error("This username is already in use.");
                next(error)
            } else {
                // if user is undefined then it doesnt already exist in our db.. we can add it in
                bcrypt.hash(req.body.password,12).then(hashedPassword => { 
                    const newUser = {
                        username: req.body.username,
                        password: hashedPassword
                    }

                    users.insert(newUser).then(insertedUser => {
                        res.json(insertedUser)
                    })
                })
            }
        })
    } else {
        next(result.error)
    }
});

module.exports = router;