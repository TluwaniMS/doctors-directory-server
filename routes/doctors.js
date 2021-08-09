const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');
const { Doctor } = require('../models/doctor');

router.get(
	'/get-all-doctors',
	errorHandler(async (req, res) => {
		const doctors = await Doctor.findAll({});

		res.status(200).send({ data: doctors });
	})
);

router.get(
	'/get-doctor/:doctorId',
	errorHandler(async (req, res) => {
		const { doctorId } = req.params;

		const doctor = await Doctor.findAll({ where: { id: doctorId } });

		res.status(200).send({ data: doctor });
	})
);

router.put(
	'/update-doctor/:doctorId',
	errorHandler(async (req, res) => {
		res.status(200).send({ status: 'successful' });
	})
);
module.exports = router;
