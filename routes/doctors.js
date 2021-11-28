const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');
const { getAllDoctors } = require('../database-services/doctors-service');
const { Doctor } = require('../models/doctor');

router.get(
	'/get-all-doctors',
	errorHandler(async (req, res) => {
		const doctors = await getAllDoctors();

		res.status(200).send({ data: doctors });
	})
);

router.get(
	'/get-doctor/:doctorId',
	errorHandler(async (req, res) => {
		const { doctorId } = req.params;

		const doctor = await Doctor.findAll({
			where: { id: doctorId },
			attributes: ['id', 'firstName', 'lastName', 'gender', 'hospital', 'specialty', 'email']
		});

		res.status(200).send({ data: doctor });
	})
);

router.put(
	'/update-doctor/:doctorId',
	errorHandler(async (req, res) => {
		const { doctorId } = req.params;
		const { firstName, lastName, gender, email } = req.body;

		await Doctor.update(
			{
				firstName: firstName,
				lastName: lastName,
				gender: gender,
				email: email
			},
			{ where: { id: doctorId } }
		);

		res.status(200).send({ status: 'successful' });
	})
);

router.get(
	'/get-doctors-by-gender/:gender',
	errorHandler(async (req, res) => {
		const { gender } = req.params;

		const doctors = await Doctor.findAll({
			where: { gender: gender },
			attributes: ['id', 'firstName', 'lastName', 'hospital', 'specialty']
		});

		res.status(200).send({ data: doctors });
	})
);

router.get(
	'/get-doctors-by-specialty/:specialtyKey',
	errorHandler(async (req, res) => {
		const { specialtyKey } = req.params;

		const doctors = await Doctor.findAll({
			where: { specialty: specialtyKey },
			attributes: ['id', 'firstName', 'lastName', 'gender', 'hospital']
		});

		res.status(200).send({ data: doctors });
	})
);

router.get(
	'/get-doctors-by-hospital/:hospitalKey',
	errorHandler(async (req, res) => {
		const { hospitalKey } = req.params;

		const doctors = await Doctor.findAll({
			where: { hospital: hospitalKey },
			attributes: ['id', 'firstName', 'lastName', 'gender', 'specialty', 'email']
		});

		res.status(200).send({ data: doctors });
	})
);

module.exports = router;
