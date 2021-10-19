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
	formatSpecialtyCountByGender,
	formatSpecialtyCountInMunicipalityByGenderAndSpecialty
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
		const totalSpecialtyCountGroupedByGenderInHospitals =
			await getHospitalsWithNestedDoctorSpecialtiesAndGenderBySpecialtyKey(
				specialtyKey
			);
		const totalSpecialtyCountGroupedByGenderInMunicipalities =
			await getMunicipalitiesWithHospitalsAndNestedDoctorSpecialtiesAndGenderBySpecialtyKey(
				specialtyKey
			);

		const formattedspecialtyCount =
			formatTotalPropertyCount(totalSpecialtyCount);
		const formattedSpecialtyCountGroupedByGender =
			formatSpecialtyCountByGender(totalSpecialtyCountGroupedByGender);
		const formattedSpecialtyCountGroupedByGenderAndSpecialtyInMunicipalities =
			formatSpecialtyCountInMunicipalityByGenderAndSpecialty(
				totalSpecialtyCountGroupedByGenderInMunicipalities
			);

		res.status(200).send({
			data: formattedSpecialtyCountGroupedByGenderAndSpecialtyInMunicipalities
		});
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
