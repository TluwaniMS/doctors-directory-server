const express = require('express');
const router = express.Router();
const {
	getDoctorsStatsGroupedByGender
} = require('../database-services/doctors-stats-service');
const { errorHandler } = require('../middleware/error-handler');

router.get(
	'/doctors-grouped-by-gender',
	errorHandler(async (req, res) => {
		const doctorsGroupedByGenderCount =
			await getDoctorsStatsGroupedByGender();

		res.status(200).send({ data: doctorsGroupedByGenderCount });
	})
);

module.exports = router;
