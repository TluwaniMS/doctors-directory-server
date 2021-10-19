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
	formatSpecialtyCountInMunicipalityByGenderAndSpecialty,
	formatSpecialtyCountGroupedByGenderInHoispitals
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
		const formattedSpecialtyCountGroupedByGenderAndSpecialtyInHospitals =
			formatSpecialtyCountGroupedByGenderInHoispitals(
				totalSpecialtyCountGroupedByGenderInHospitals
			);

		res.status(200).send({
			totalSpecialtyCount: formattedspecialtyCount,
			specialtyCountGroupedByGender:
				formattedSpecialtyCountGroupedByGender,
			specialtyCountGroupedByGenderForMunicipalities:
				formattedSpecialtyCountGroupedByGenderAndSpecialtyInMunicipalities,
			specialtyCountGroupedByGenderForHospitals:
				formattedSpecialtyCountGroupedByGenderAndSpecialtyInHospitals
		});
	})
);

module.exports = router;
