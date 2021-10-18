const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');
const {
	getHospitalsWithNestedDoctorSpecialtiesAndGenderBySpecialtyKey,
	getMunicipalitiesWithHospitalsAndNestedDoctorSpecialtiesAndGenderBySpecialtyKey,
	getTotalOfDoctorsGroupedByGenderAndSpecialtyBySpecialtyKey,
	getTotalSpecialtyCountBySpecialtyKey
} = require('../database-services/specialty-stats-service');
const {
	formatTotalPropertyCount
} = require('../auxiliary-services/shared-services');
const {
	formatSpecialtyCountByGender
} = require('../auxiliary-services/specialty-stats-service');

router.get(
	'/get-total-specialty-count/:specialtyKey',
	errorHandler(async (req, res) => {
		const { specialtyKey } = req.params;

		const totalSpecialtyCount = await getTotalSpecialtyCountBySpecialtyKey(
			specialtyKey
		);
		const totalSpecialtyCountGroupedByGender =
			await getTotalOfDoctorsGroupedByGenderAndSpecialtyBySpecialtyKey(
				specialtyKey
			);

		const formattedspecialtyCount =
			formatTotalPropertyCount(totalSpecialtyCount);
		const formattedSpecialtyCountGroupedByGender =
			formatSpecialtyCountByGender(totalSpecialtyCountGroupedByGender);

		res.status(200).send({ data: formattedSpecialtyCountGroupedByGender });
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
