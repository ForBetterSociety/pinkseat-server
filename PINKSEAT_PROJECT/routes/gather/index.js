const express = require('express');
const router = express.Router();

router.use('/', require('./gather.js'));

module.exports = router;