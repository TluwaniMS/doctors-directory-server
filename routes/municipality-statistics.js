const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');

router.get(
	'/get-stats-count-by-municipality-grouped-by-hospital',
	errorHandler(async (req, res) => {
		res.status(200).send({ data: '' });
	})
);

router.get(
	'/get-stats-count-by-municipality-grouped-by-specialty',
	errorHandler(async (req, res) => {
		res.status(200).send({ data: '' });
	})
);

router.get(
	'/get-stats-count-by-municipality-grouped-by-gender',
	errorHandler(async (req, res) => {
		res.status(200).send({ data: '' });
	})
);

router.get(
	'/get-stats-count-by-municipality-grouped-by-gender-and-specialty',
	errorHandler(async (req, res) => {
		res.status(200).send({ data: '' });
	})
);
module.exports = router;
