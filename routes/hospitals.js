const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');
const { Hospital } = require('../models/hospital');

router.get(
	'/get-all-hospitals',
	errorHandler(async (req, res) => {
		const hospitals = await Hospital.findAll({});

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
		res.status(200).send({ status: 'successful' });
	})
);
module.exports = router;
