const express = require('express');
const router = express.Router();

router.use('/', require('./auth.js'));

module.exports = router;