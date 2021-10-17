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
	'/get-municipality-statistics/:municipalityKey',
	errorHandler(async (req, res) => {
		const { municipalityKey } = req.params;

		const municipalitiesGenderCount =
			await getMunicipalityWithHospitalsAndNestedDoctorGendersByKey(
				municipalityKey
			);
		const municipalityDoctorsSpecialtyCount =
			await getMunicipalityWithHospitalsAndNestedDoctorSpecialtiesByKey(
				municipalityKey
			);
		const municipalitiesSpecialtyCountGroupedByGender =
			await getMunicipalityWithHospitalsAndNestedDoctorSpecialtiesAndGenderByKey(
				municipalityKey
			);
		const municipalitiesWithHospitalsAndNestedDoctors =
			await getMunicipalityWithHospitalsAndNestedDoctorsByKey(
				municipalityKey
			);
		const municipalitiesWithHospitals =
			await getMunicipalityNestedWithHospitalsByKey(municipalityKey);

		const municipalitiesWithHospitalCount =
			calculateMunicipalityHospitalCount(municipalitiesWithHospitals);
		const municipalitiesWithGenderCount = calculateMunicipalityGenderCount(
			municipalitiesGenderCount
		);
		const municipalitiesWithTotalDoctorCount =
			calculateMunicipalityDoctorsCount(
				municipalitiesWithHospitalsAndNestedDoctors
			);
		const municipalitiesWithSpecialtyCountsGroupedByGender =
			calculateMunicipalitySpecialitiesGroupedByGenderCount(
				municipalitiesSpecialtyCountGroupedByGender
			);
		const municipalityWithTotalSpecialtyCount =
			calculateMunicipalitySpecialityCount(
				municipalityDoctorsSpecialtyCount
			);
		res.status(200).send({
			totalHospitalsInMunicipality: municipalitiesWithHospitalCount,
			totalGenderCountInMunicipality: municipalitiesWithGenderCount,
			totalDoctorCountInMunicipality: municipalitiesWithTotalDoctorCount,
			totalSpecialtyCountGroupedByGenderInMunicipality:
				municipalitiesWithSpecialtyCountsGroupedByGender,
			totalSpecialtyCountInMunicipality:
				municipalityWithTotalSpecialtyCount
		});
	})
);

module.exports = router;
