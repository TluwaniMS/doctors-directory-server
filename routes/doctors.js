const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');
const { Doctor } = require('../models/doctor');

router.get(
	'/get-all-doctors',
	errorHandler(async (req, res) => {
		res.status(200).send({ data: '' });
	})
);

router.get(
	'/get-doctor/:doctorId',
	errorHandler(async (req, res) => {
		res.status(200).send({ data: '' });
	})
);

router.put(
	'/update-doctor/:doctorId',
	errorHandler(async (req, res) => {
		res.status(200).send({ status: 'successful' });
	})
);
module.exports = router;
