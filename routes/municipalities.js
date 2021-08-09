const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');
const { Municipality } = require('../models/municipality');

router.get(
	'/get-municipalities',
	errorHandler(async (req, res) => {
		const municipalities = await Municipality.findAll({});

		res.status(200).send({ data: municipalities });
	})
);

router.get(
	'/get-municipality/:municipalityId',
	errorHandler(async (req, res) => {
		const { municipalityId } = req.params;

		const municipality = await Municipality.findAll({
			where: { municipalityKey: municipalityId }
		});

		res.status(200).send({ data: municipality });
	})
);

router.post(
	'/update-municipality/:municipalityId',
	errorHandler(async (req, res) => {
		res.status(200).send({ status: 'successful' });
	})
);
module.exports = router;
