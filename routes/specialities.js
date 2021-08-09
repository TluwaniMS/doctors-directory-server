const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');

router.get(
	'/get-all-specialties',
	errorHandler(async (req, res) => {
		res.status(200).send({ data: '' });
	})
);

router.get(
	'/get-specialty/:specialtyId',
	errorHandler(async (req, res) => {
		res.status(200).send({ data: '' });
	})
);

router.put(
	'/update-specialty/:specialtyId',
	errorHandler(async (req, res) => {
		res.status(200).send({ status: 'successful' });
	})
);
module.exports = router;
