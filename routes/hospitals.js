const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');
const { Hospital } = require('../models/hospital');

router.get(
	'/get-all-hospitals',
	errorHandler(async (req, res) => {
		res.status(200).send({ data: '' });
	})
);

router.get(
	'/get-hospital/:hospitalId',
	errorHandler(async (req, res) => {
		res.status(200).send({ data: '' });
	})
);

router.put(
	'/update-hospital/:hospitalId',
	errorHandler(async (req, res) => {
		res.status(200).send({ status: 'successful' });
	})
);
module.exports = router;
