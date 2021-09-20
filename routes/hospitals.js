const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');
const {
	getAllHospitals,
	getHospitalsByMunicipality
} = require('../database-services/hospitals-service');
const {
	extractHospitalKeys,
	formatBasicStatsForHospitalsOnMunicipalView
} = require('../auxiliary-services/hospitals-services');
const {
	findDoctorsFromHospitalKeysArray
} = require('../database-services/doctors-service');
const {
	getBasicStatsForSingleMunicipality
} = require('../auxiliary-services/shared-services');
const { Hospital } = require('../models/hospital');

router.get(
	'/get-all-hospitals',
	errorHandler(async (req, res) => {
		const hospitals = await getAllHospitals();

		res.status(200).send({ data: hospitals });
	})
);

router.get(
	'/get-hospital/:hospitalId',
	errorHandler(async (req, res) => {
		const { hospitalId } = req.params;

		const hospital = await Hospital.findAll({
			where: { hospitalKey: hospitalId }
		});

		res.status(200).send({ data: hospital });
	})
);

router.put(
	'/update-hospital/:hospitalId',
	errorHandler(async (req, res) => {
		const { hospitalId } = req.params;
		const { hospitalName, municipality } = req.body;

		await Hospital.update(
			{ hospitalName: hospitalName, municipality: municipality },
			{ where: { hospitalKey: hospitalId } }
		);

		res.status(200).send({ status: 'successful' });
	})
);

router.get(
	'/get-hospitals-by-municipality/:municipalityKey',
	errorHandler(async (req, res) => {
		const { municipalityKey } = req.params;

		const hospitals = await getHospitalsByMunicipality(municipalityKey);
		const hospitalKeys = extractHospitalKeys(hospitals);
		const doctors = await findDoctorsFromHospitalKeysArray(hospitalKeys);
		const basicStats = getBasicStatsForSingleMunicipality(
			hospitals,
			doctors
		);

		const hospitalsWithBasicStats =
			formatBasicStatsForHospitalsOnMunicipalView(hospitals, doctors);

		res.status(200).send({
			hospitals: hospitalsWithBasicStats,
			basicStats: basicStats
		});
	})
);
module.exports = router;
