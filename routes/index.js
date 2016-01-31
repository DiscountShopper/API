var express = require('express');

var Api = require('./api');
var router = express.Router();

/* ZE API */
router.use('/api/groceries', new Api("GROCERIES").router);
router.use('/api/drugstores', new Api("DRUGSTORES").router);

module.exports = router;
