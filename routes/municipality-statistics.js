const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');
const {
	getMunicipalitiesWithHospitalsAndNestedDoctorGenders,
	getMunicipalitiesWithHospitalsAndNestedDoctorSpecialties,
	getMunicipalitiesWithHospitalsAndNestedDoctorSpecialtiesAndGender,
	getMunicipalitiesNestedWithHospitals,
	getMunicipalitiesWithHospitalsAndNestedDoctors
} = require('../database-services/municpality-stats-service');
const {
	calculateMunicipalityHospitalCount,
	calculateMunicipalityDoctorsCount,
	calculateMunicipalityGenderCount,
	calculateMunicipalitySpecialityCount
} = require('../auxiliary-services/municipality-stats-service');

router.get(
	'/get-gender-count-of-municipalities-doctors',
	errorHandler(async (req, res) => {
		const municipalitiesGenderCount =
			await getMunicipalitiesWithHospitalsAndNestedDoctorGenders();

		const municipalitiesWithGenderCount = calculateMunicipalityGenderCount(
			municipalitiesGenderCount
		);

		res.status(200).send({ data: municipalitiesWithGenderCount });
	})
);

router.get(
	'/get-specialty-count-of-municipalities-doctors',
	errorHandler(async (req, res) => {
		const municipalityDoctorsSpecialtyCount =
			await getMunicipalitiesWithHospitalsAndNestedDoctorSpecialties();

		const municipalityWithTotalSpecialtyCount =
			calculateMunicipalitySpecialityCount(
				municipalityDoctorsSpecialtyCount
			);

		res.status(200).send({ data: municipalityWithTotalSpecialtyCount });
	})
);

router.get(
	'/get-specialty-count-of-municipalities-grouped-by-gender',
	errorHandler(async (req, res) => {
		const municipalitiesSpecialtyCountGroupedByGender =
			await getMunicipalitiesWithHospitalsAndNestedDoctorSpecialtiesAndGender();

		res.status(200).send({
			data: municipalitiesSpecialtyCountGroupedByGender
		});
	})
);

router.get(
	'/get-total-doctors-count-of-municipalities',
	errorHandler(async (req, res) => {
		const municipalitiesWithHospitalsAndNestedDoctors =
			await getMunicipalitiesWithHospitalsAndNestedDoctors();

		const municipalitiesWithTotalDoctorCount =
			calculateMunicipalityDoctorsCount(
				municipalitiesWithHospitalsAndNestedDoctors
			);

		res.status(200).send({ data: municipalitiesWithTotalDoctorCount });
	})
);

router.get(
	'/get-total-hospital-count-of-municipalities',
	errorHandler(async (req, res) => {
		const municipalitiesWithHospitals =
			await getMunicipalitiesNestedWithHospitals();

		const municipalitiesWithHospitalCount =
			calculateMunicipalityHospitalCount(municipalitiesWithHospitals);

		res.status(200).send({ data: municipalitiesWithHospitalCount });
	})
);

module.exports = router;
