const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');
const { Municipality } = require('../models/municipality');

router.get(
	'/get-municipalities',
	errorHandler(async (req, res) => {
		res.status(200).send({ data: '' });
	})
);

router.get(
	'/get-municipality/:municipalityId',
	errorHandler(async (req, res) => {
		res.status(200).send({ data: '' });
	})
);

router.post(
	'/update-municipality/:municipalityId',
	errorHandler(async (req, res) => {
		res.status(200).send({ status: 'successful' });
	})
);
module.exports = router;
