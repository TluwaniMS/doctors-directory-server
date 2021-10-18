const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');
const {
	getTotalDoctorsByHospitalStatsGroupedByGender,
	getTotalDoctorsByHospitalStatsGroupedByGenderAndSpecialty,
	getTotalHospitalSpecialtyCount,
	getTotalHospitalDoctorCount
} = require('../database-services/hospital-stats-service');
const {
	formatHospitalSpecialtyCount,
	formatHospitalSpecialtyCountByGender,
	formatHospitalGenderCount
} = require('../auxiliary-services/hospitals-stats-service');
const {
	formatTotalPropertyCount
} = require('../auxiliary-services/shared-services');

router.get(
	'/get-hospital-statistics/:hospitalKey',
	errorHandler(async (req, res) => {
		const { hospitalKey } = req.params;

		const totalGenderCount =
			await getTotalDoctorsByHospitalStatsGroupedByGender(hospitalKey);
		const totalDoctorCount = await getTotalHospitalDoctorCount(hospitalKey);
		const totalSpecialtyCount = await getTotalHospitalSpecialtyCount(
			hospitalKey
		);
		const totalSpecialtyCountGroupedByGender =
			await getTotalDoctorsByHospitalStatsGroupedByGenderAndSpecialty(
				hospitalKey
			);

		const formatHospitalSpecialtyCountGroupedByGender =
			formatHospitalSpecialtyCountByGender(
				totalSpecialtyCountGroupedByGender
			);
		const formattedGenderCount =
			formatHospitalGenderCount(totalGenderCount);
		const formattedDoctorsCount =
			formatTotalPropertyCount(totalDoctorCount);
		const formattedSpecialtyCount =
			formatHospitalSpecialtyCount(totalSpecialtyCount);

		res.status(200).send({
			specialtyCountGroupedByGender:
				formatHospitalSpecialtyCountGroupedByGender,
			genderCount: formattedGenderCount,
			doctorsCount: formattedDoctorsCount,
			specialtyCount: formattedSpecialtyCount
		});
	})
);

module.exports = router;
