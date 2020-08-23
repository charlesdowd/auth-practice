const express = require('express');

const router = express.Router();

// any route inside of here is pre-pended with '/auth'

router.get('/', (req, res) => {
    res.json({
        message: "auth router!"
    });
})

router.post('/signup', (req, res) => {
    res.json({
        message: "auth sign up route hit and nodemon working!"
    });
});

module.exports = router;