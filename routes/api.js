var express = require('express');
var request = require('request');
var constants = require('../models/constants');
var router = express.Router();


var handleServiceResponse = function(res, error, response, body){
	if(error){
		console.log('Error making http request to service');
		res.status(500).json({
			error: 'Internal server error, service is probably down.',
			message: body
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
};

router.get('/stores/:postalCode', function(req, res){
	var serviceUrl = constants.SERVICE_URL + '/api/stores/' + req.params.postalCode;
	console.log({
		postalCode : req.params.postalCode
	});
	request(serviceUrl, function(err, response, body){
		handleServiceResponse(res, err, response, body);
	});
});

router.get('/stores/:bannerCode/:postalCode', function(req, res){
	var serviceUrl = constants.SERVICE_URL + '/api/stores/' + req.params.bannerCode + '/' + req.params.postalCode;
	console.log({
		bannerCode : req.params.bannerCode,
		postalCode : req.params.postalCode
	});
	request(serviceUrl, function(err, response, body){
		handleServiceResponse(res, err, response, body);
	});
});

router.get('/publications/:bannerCode/:storeGuid', function(req, res) {
	var serviceUrl = constants.SERVICE_URL + '/api/publications/' + req.params.bannerCode + '/' + req.params.storeGuid;
	console.log({
		store: req.params.store
	});
	request(serviceUrl, function(err, response, body){
		handleServiceResponse(res, err, response, body);
	});
});

module.exports = router;
