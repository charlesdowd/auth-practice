const express = require('express');

const router = express.Router();

// any route inside of here is pre-pended with '/auth'

router.get('/', (req, res) => {
    res.json({
        message: "auth router!"
    });
})

module.exports = router;