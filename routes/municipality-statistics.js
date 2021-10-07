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

router.get(
	'/get-gender-count-of-municipalities-doctors',
	errorHandler(async (req, res) => {
		const municipalitiesGenderCount =
			await getMunicipalitiesWithHospitalsAndNestedDoctorGenders();

		res.status(200).send({ data: municipalitiesGenderCount });
	})
);

router.get(
	'/get-specialty-count-of-municipalities-doctors',
	errorHandler(async (req, res) => {
		const municipalityDoctorsSpecialtyCount =
			await getMunicipalitiesWithHospitalsAndNestedDoctorSpecialties();

		res.status(200).send({ data: municipalityDoctorsSpecialtyCount });
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
		const municipalitiesDoctorCount =
			await getMunicipalitiesWithHospitalsAndNestedDoctors();

		res.status(200).send({ data: municipalitiesDoctorCount });
	})
);

router.get(
	'/get-total-hospital-count-of-municipalities',
	errorHandler(async (req, res) => {
		const municipalitiesHospitalCount =
			await getMunicipalitiesNestedWithHospitals();

		res.status(200).send({ data: municipalitiesHospitalCount });
	})
);

module.exports = router;
