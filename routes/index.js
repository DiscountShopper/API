var express = require('express');
var api = require('./api');
var router = express.Router();

/* GET home page. */
router.use('/api', api);

module.exports = router;
