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

router.get(
	'/get-doctors-by-gender/:gender',
	errorHandler(async (req, res) => {
		const { gender } = req.params;

		const doctors = await Doctor.findAll({ where: { gender: gender } });

		res.status(200).send({ data: doctors });
	})
);

router.get(
	'/get-doctors-by-specialty/:specialtyKey',
	errorHandler(async (req, res) => {
		const { specialtyKey } = req.params;

		const doctors = await Doctor.findAll({
			where: { specialty: specialtyKey }
		});

		res.status(200).send({ data: doctors });
	})
);

router.get(
	'/get-doctors-by-hospital/:hospitalKey',
	errorHandler(async (req, res) => {
		const { hospitalKey } = req.params;

		const doctors = await Doctor.findAll({
			where: { hospital: hospitalKey }
		});

		res.status(200).send({ data: doctors });
	})
);

module.exports = router;
