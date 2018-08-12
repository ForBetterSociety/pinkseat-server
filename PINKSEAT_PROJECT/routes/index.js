const express = require('express');
const router = express.Router();

router.use('/info', require('./info/index.js'));
router.use('/gather', require('./gather/index.js'));
router.use('/auth', require('./auth/index.js'));
module.exports = router;