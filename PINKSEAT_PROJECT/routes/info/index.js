const express = require('express');
const router = express.Router();

router.use('/', require('./subway.js'));

module.exports = router;