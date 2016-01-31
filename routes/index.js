var express = require('express');
var request = require('request');
var Api = require('./api');
var constants = require('../models/constants');
var router = express.Router();

/* ZE API */
router.use('/api/groceries', new Api("GROCERIES").router);
router.use('/api/drugstores', new Api("DRUGSTORES").router);
router.post('/api/pdf', function(req, res){
	request.post(constants.SERVICE_URL + '/api/pdf', req.body, function(err, httpResponse, body){
		if(err){
			res.status(500).json({
				error: 'Internal server error, service is probably down.',
				message: body
			});
		}
		else {
			switch(httpResponse.statusCode){
				case 200:
					res.json(typeof body === "string" ? JSON.parse(body) : body);
					break;
				case 400:
					res.status(400).json({
						error: 'Bad request, verify that the parameters are ok.',
						message: body
					});
					break;
				case 500:
					res.status(500).json({
						error: 'Internal server error, service is probably down.',
						message: body
					});
					break;
			}
		}

	});
});

module.exports = router;
