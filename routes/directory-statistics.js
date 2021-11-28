const express = require('express');
const router = express.Router();
const {
	getDoctorsStatsGroupedByGender,
	getDoctorsStatsGroupedByGenderAndSpecialty,
	getDoctorsStatsByHospitalKeyGroupedByGenderAndSpecialty
} = require('../database-services/doctors-stats-service');
const { errorHandler } = require('../middleware/error-handler');

router.get(
	'/doctors-grouped-by-gender',
	errorHandler(async (req, res) => {
		const doctorsGroupedByGenderCount = await getDoctorsStatsGroupedByGender();

		res.status(200).send({ data: doctorsGroupedByGenderCount });
	})
);

router.get(
	'/doctors-grouped-by-gender-and-specialty',
	errorHandler(async (req, res) => {
		const doctorsGroupedByGenderAndSpecialtyCount = await getDoctorsStatsGroupedByGenderAndSpecialty();

		res.status(200).send({ data: doctorsGroupedByGenderAndSpecialtyCount });
	})
);

router.get(
	'/get-doctors-by-hospital-key-grouped-by-gender-and-specialty/:hospitalKey',
	errorHandler(async (req, res) => {
		const { hospitalKey } = req.params;
		const doctorsGroupedByGenderAndSpecialtyCount = await getDoctorsStatsByHospitalKeyGroupedByGenderAndSpecialty(
			hospitalKey
		);

		res.status(200).send({ data: doctorsGroupedByGenderAndSpecialtyCount });
	})
);

module.exports = router;
