const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');
const {
	getAllSpecialties
} = require('../database-services/specialties-service');
const { Specialisation } = require('../models/specialisation');

router.get(
	'/get-all-specialties',
	errorHandler(async (req, res) => {
		const specialties = await getAllSpecialties();

		res.status(200).send({ data: specialties });
	})
);

router.get(
	'/get-specialty/:specialtyId',
	errorHandler(async (req, res) => {
		const { specialtyId } = req.params;

		const specialty = await Specialisation.findAll({
			where: { specialisationKey: specialtyId }
		});

		res.status(200).send({ data: specialty });
	})
);

router.put(
	'/update-specialty/:specialtyId',
	errorHandler(async (req, res) => {
		const { specialtyId } = req.params;
		const { specialisationName } = req.body;

		await Specialisation.update(
			{ specialisationName: specialisationName },
			{ where: { specialisationKey: specialtyId } }
		);

		res.status(200).send({ status: 'successful' });
	})
);

module.exports = router;
