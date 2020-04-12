const express = require('express');
const router = express.Router();

/**
 * Default router home page
 */
router.get('/', (req, res, next) => {
    res.send('Node API');
});

module.exports = router;