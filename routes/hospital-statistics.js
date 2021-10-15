const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');
const {
	getTotalDoctorsByHospitalStatsGroupedByGender,
	getTotalDoctorsByHospitalStatsGroupedByGenderAndSpecialty,
	getTotalHospitalSpecialtyCount
} = require('../database-services/hospital-stats-service');
const {
	formatHospitalSpecialtyCount,
	formatHospitalSpecialtyCountByGender
} = require('../auxiliary-services/hospitals-stats-service');

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
		const formattedSpecialtyCount =
			formatHospitalSpecialtyCount(totalSpecialtyCount);

		res.status(200).send({ data: formattedSpecialtyCount });
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

		const formatHospitalSpecialtyCountGroupedByGender =
			formatHospitalSpecialtyCountByGender(
				totalSpecialtyCountGroupedByGender
			);

		res.status(200).send({
			data: formatHospitalSpecialtyCountGroupedByGender
		});
	})
);

module.exports = router;
