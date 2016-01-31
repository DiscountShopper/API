var express = require('express');
var request = require('request');
var constants = require('../models/constants');

var EnhancedRouter = function(type){
	this.type = type;
	this.router = express.Router();
	this.handleServiceResponse = function(res, error, response, body){
		if(error){
			res.status(500).json({
				error: 'Internal server error, service is probably down.',
				message: body
			});
		}
		else {
			switch(response.statusCode){
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
	};

	var that = this;

	this.router.get('/stores/:postalCode', function(req, res){
		var serviceUrl = constants.SERVICE_URL + '/api/stores/' + req.params.postalCode + '?type=' + that.type;
		request(serviceUrl, function(err, response, body){
			that.handleServiceResponse(res, err, response, body);
		});
	});

	this.router.get('/stores/:bannerCode/:postalCode', function(req, res){
		var serviceUrl = constants.SERVICE_URL + '/api/stores/' + req.params.bannerCode + '/' + req.params.postalCode + '?type=' + that.type;
		request(serviceUrl, function(err, response, body){
			that.handleServiceResponse(res, err, response, body);
		});
	});

	this.router.get('/publications/:bannerCode/:storeGuid', function(req, res) {
		var serviceUrl = constants.SERVICE_URL + '/api/publications/' + req.params.bannerCode + '/' + req.params.storeGuid + '?type=' + that.type;
		request(serviceUrl, function(err, response, body){
			that.handleServiceResponse(res, err, response, body);
		});
	});

	this.router.get('/products/:publicationId/:productId', function(req, res){
		var serviceUrl = constants.SERVICE_URL + '/api/products/' + req.params.publicationId + '/' + req.params.productId + '?type=' + that.type;
		request(serviceUrl, function(err, response, body){
			that.handleServiceResponse(res, err, response, body);
		});
	});

	this.router.get('/closest/publications/:postalCode', function(req, res){
		var serviceUrl = constants.SERVICE_URL + '/api/closest/publications/' + req.params.postalCode + '?type=' + that.type;
		request(serviceUrl, function(err, response, body){
			that.handleServiceResponse(res, err, response, body);
		});
	});

	this.router.get('/closest/categories/:postalCode', function(req, res){
		var serviceUrl = constants.SERVICE_URL + '/api/closest/categories/' + req.params.postalCode + '?type=' + that.type;
		request(serviceUrl, function(err, response, body){
			that.handleServiceResponse(res, err, response, body);
		});
	});

	this.router.post('/recommended/products/:postalCode', function(req, res){
		var serviceUrl = constants.SERVICE_URL + '/api/recommended/products/' + req.params.postalCode +'?type=' + that.type;

		var options = {
			uri: serviceUrl,
			method: 'POST',
			json: req.body
		};

		request(options, function(err, response, body){
			that.handleServiceResponse(res, err, response, body);
		});
	});
};

module.exports = EnhancedRouter;
