var express = require('express');
var request = require('request');
var constants = require('../models/constants');
var router = express.Router();

router.get('/stores/:bannerCode/:postalCode', function(req, res){
	var serviceUrl = constants.SERVICE_URL + '/api/' + req.params.bannerCode + '/' + req.params.postalCode;
	console.log({
		bannerCode : req.params.bannerCode,
		postalCode : req.params.postalCode
	});
	request(serviceUrl, function(error, response, body){
		if(error){
			console.log('Error making http request to service');
			res.status(500).json({
				error: 'Internal server error, service is probably down.',
				message: responseBody.message
			});
		}
		else {
			switch(response.statusCode){
				case 200:
					res.json(JSON.parse(body));
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

router.get('/publications/:store', function(req, res) {

});

module.exports = router;
