const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');
const {
	getTotalOfDoctorsGroupedByGenderAndSpecialty,
	getTotalSpecialtyCount
} = require('../database-services/specialty-stats-service');

router.get(
	'/get-total-specialty-count',
	errorHandler(async (req, res) => {
		const totalSpecialtyCount = await getTotalSpecialtyCount();

		res.status(200).send({ data: totalSpecialtyCount });
	})
);

router.get(
	'/get-total-specialty-count-grouped-by-gender',
	errorHandler(async (req, res) => {
		const totalSpecialtyCountGroupedByGender =
			await getTotalOfDoctorsGroupedByGenderAndSpecialty();

		res.status(200).send({ data: totalSpecialtyCountGroupedByGender });
	})
);

module.exports = router;
