const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');
const {
	getTotalOfDoctorsInDirectory,
	getTotalOfHospitalsInDirectory,
	getTotalOfMunicipalitiesInDirectory,
	getTotalOfDoctorsGroupedBySpecialty,
	getTotalDoctorsGroupedByGender
} = require('../database-services/main-directory-stats-service');
const {
	addSpecialtyNamesToSpecialties,
	formatTotalGroupedGenderCount
} = require('../auxiliary-services/main-directory-stats-service');
const {
	calculateMunicipalityHospitalCount,
	calculateMunicipalityGenderCount
} = require('../auxiliary-services/municipality-stats-service');
const {
	getMunicipalitiesWithHospitalsAndNestedDoctorGenders,
	getMunicipalitiesNestedWithHospitals
} = require('../database-services/municpality-stats-service');
const { formatTotalPropertyCount } = require('../auxiliary-services/shared-services');

router.get(
	'/main-directory-statistics',
	errorHandler(async (req, res) => {
		const totalOfDoctors = await getTotalOfDoctorsInDirectory();
		const totalHospitals = await getTotalOfHospitalsInDirectory();
		const totalMunicipalities = await getTotalOfMunicipalitiesInDirectory();
		const totalDoctorsCountGroupedByGender = await getTotalDoctorsGroupedByGender();

		const totalDoctorsGroupedInSpecialties = await getTotalOfDoctorsGroupedBySpecialty();
		const doctorsGroupedInSpecialtiesWithSpecialtyNames = addSpecialtyNamesToSpecialties(
			totalDoctorsGroupedInSpecialties
		);

		const municipalitiesWithHospitals = await getMunicipalitiesNestedWithHospitals();
		const municipalitiesWithHospitalCount = calculateMunicipalityHospitalCount(municipalitiesWithHospitals);

		const municipalitiesGenderCount = await getMunicipalitiesWithHospitalsAndNestedDoctorGenders();
		const municipalitiesWithGenderCount = calculateMunicipalityGenderCount(municipalitiesGenderCount);

		const formattedDoctorsCounts = formatTotalPropertyCount(totalOfDoctors);
		const formattedHospitalCount = formatTotalPropertyCount(totalHospitals);
		const formattedMunicipalityCount = formatTotalPropertyCount(totalMunicipalities);
		const formattedGenderCount = formatTotalGroupedGenderCount(totalDoctorsCountGroupedByGender);
		await res.status(200).send({
			totalDoctors: formattedDoctorsCounts,
			totalHospitals: formattedHospitalCount,
			totalMunicipalities: formattedMunicipalityCount,
			totalDoctorsGroupedByGender: formattedGenderCount,
			totalDoctorsGroupedBySpecialty: doctorsGroupedInSpecialtiesWithSpecialtyNames,
			totalHospitalsOfEachMunicipality: municipalitiesWithHospitalCount,
			totalGenderCountOfDoctorsInMunicipality: municipalitiesWithGenderCount
		});
	})
);

module.exports = router;
