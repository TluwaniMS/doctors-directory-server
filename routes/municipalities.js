const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');
const { getAllMunicipalities } = require('../database-services/municipalities-service');
const { calculateBasicDirectoryStatsForMunicipalView } = require('../auxiliary-services/shared-services');
const { Municipality } = require('../models/municipality');

router.get(
	'/get-municipalities',
	errorHandler(async (req, res) => {
		const municipalities = await getAllMunicipalities();
		const basicStats = await calculateBasicDirectoryStatsForMunicipalView();

		res.status(200).send({
			municipalities: municipalities,
			basicStats: basicStats
		});
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
		const { municipalityId } = req.params;
		const { municipalityName } = req.body;

		await Municipality.update(
			{ municipalityName: municipalityName },
			{ where: { municipalityKey: municipalityId } }
		);

		res.status(200).send({ status: 'successful' });
	})
);
module.exports = router;
