const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');
const {
	getTotalDoctorsByHospitalStatsGroupedByGender,
	getTotalDoctorsByHospitalStatsGroupedByGenderAndSpecialty,
	getTotalHospitalSpecialtyCount
} = require('../database-services/hospital-stats-service');

router.get(
	'/get-total-hospital-gender-count/:hospitalKey',
	errorHandler(async (req, res) => {
		const { hospitalKey } = req.params;
		const totalGenderCount =
			await getTotalDoctorsByHospitalStatsGroupedByGender(hospitalKey);

		res.status(200).send({ data: totalGenderCount });
	})
);

router.get(
	'/get-total-hospital-specialty-count/:hospitalKey',
	errorHandler(async (req, res) => {
		const { hospitalKey } = req.params;
		const totalSpecialtyCount = await getTotalHospitalSpecialtyCount(
			hospitalKey
		);

		res.status(200).send({ data: totalSpecialtyCount });
	})
);

router.get(
	'/get-total-hospital-specialty-count-grouped-by-gender/:hospitalKey',
	errorHandler(async (req, res) => {
		const { hospitalKey } = req.params;
		const totalSpecialtyCountGroupedByGender =
			await getTotalDoctorsByHospitalStatsGroupedByGenderAndSpecialty(
				hospitalKey
			);

		res.status(200).send({ data: totalSpecialtyCountGroupedByGender });
	})
);

module.exports = router;
