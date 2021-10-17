const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');
const {
	getMunicipalityNestedWithHospitalsByKey,
	getMunicipalityWithHospitalsAndNestedDoctorGendersByKey,
	getMunicipalityWithHospitalsAndNestedDoctorSpecialtiesByKey,
	getMunicipalityWithHospitalsAndNestedDoctorSpecialtiesAndGenderByKey,
	getMunicipalityWithHospitalsAndNestedDoctorsByKey
} = require('../database-services/municpality-stats-service');
const {
	calculateMunicipalityHospitalCount,
	calculateMunicipalityDoctorsCount,
	calculateMunicipalityGenderCount,
	calculateMunicipalitySpecialityCount,
	calculateMunicipalitySpecialitiesGroupedByGenderCount
} = require('../auxiliary-services/municipality-stats-service');

router.get(
	'/get-gender-count-of-municipality-doctors/:municipalityKey',
	errorHandler(async (req, res) => {
		const { municipalityKey } = req.params;
		const municipalitiesGenderCount =
			await getMunicipalityWithHospitalsAndNestedDoctorGendersByKey(
				municipalityKey
			);

		const municipalitiesWithGenderCount = calculateMunicipalityGenderCount(
			municipalitiesGenderCount
		);

		res.status(200).send({ data: municipalitiesWithGenderCount });
	})
);

router.get(
	'/get-specialty-count-of-municipalities-doctors/:municipalityKey',
	errorHandler(async (req, res) => {
		const { municipalityKey } = req.params;
		const municipalityDoctorsSpecialtyCount =
			await getMunicipalityWithHospitalsAndNestedDoctorSpecialtiesByKey(
				municipalityKey
			);

		const municipalityWithTotalSpecialtyCount =
			calculateMunicipalitySpecialityCount(
				municipalityDoctorsSpecialtyCount
			);

		res.status(200).send({ data: municipalityWithTotalSpecialtyCount });
	})
);

router.get(
	'/get-specialty-count-of-municipalities-grouped-by-gender/:municipalityKey',
	errorHandler(async (req, res) => {
		const { municipalityKey } = req.params;
		const municipalitiesSpecialtyCountGroupedByGender =
			await getMunicipalityWithHospitalsAndNestedDoctorSpecialtiesAndGenderByKey(
				municipalityKey
			);

		const municipalitiesWithSpecialtyCountsGroupedByGender =
			calculateMunicipalitySpecialitiesGroupedByGenderCount(
				municipalitiesSpecialtyCountGroupedByGender
			);

		res.status(200).send({
			data: municipalitiesWithSpecialtyCountsGroupedByGender
		});
	})
);

router.get(
	'/get-total-doctors-count-of-municipalities/:municipalityKey',
	errorHandler(async (req, res) => {
		const { municipalityKey } = req.params;
		const municipalitiesWithHospitalsAndNestedDoctors =
			await getMunicipalityWithHospitalsAndNestedDoctorsByKey(
				municipalityKey
			);

		const municipalitiesWithTotalDoctorCount =
			calculateMunicipalityDoctorsCount(
				municipalitiesWithHospitalsAndNestedDoctors
			);

		res.status(200).send({ data: municipalitiesWithTotalDoctorCount });
	})
);

router.get(
	'/get-total-hospital-count-of-municipalities/:municipalityKey',
	errorHandler(async (req, res) => {
		const { municipalityKey } = req.params;
		const municipalitiesWithHospitals =
			await getMunicipalityNestedWithHospitalsByKey(municipalityKey);

		const municipalitiesWithHospitalCount =
			calculateMunicipalityHospitalCount(municipalitiesWithHospitals);

		res.status(200).send({ data: municipalitiesWithHospitalCount });
	})
);

module.exports = router;
