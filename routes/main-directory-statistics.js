const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');
const {
	getTotalOfDoctorsInDirectory,
	getTotalOfHospitalsInDirectory,
	getTotalOfMunicipalitiesInDirectory,
	getTotalOfDoctorsGroupedBySpecialty
} = require('../database-services/main-directory-stats-service');
const {
	addSpecialtyNamesToSpecialties
} = require('../auxiliary-services/main-directory-stats-service');
const {
	calculateMunicipalityHospitalCount,
	calculateMunicipalityDoctorsCount,
	calculateMunicipalityGenderCount,
	calculateMunicipalitySpecialityCount,
	calculateMunicipalitySpecialitiesGroupedByGenderCount
} = require('../auxiliary-services/municipality-stats-service');
const {
	getMunicipalitiesWithHospitalsAndNestedDoctorGenders,
	getMunicipalitiesWithHospitalsAndNestedDoctorSpecialties,
	getMunicipalitiesWithHospitalsAndNestedDoctorSpecialtiesAndGender,
	getMunicipalitiesNestedWithHospitals,
	getMunicipalitiesWithHospitalsAndNestedDoctors
} = require('../database-services/municpality-stats-service');

router.get(
	'/get-total-doctors-in-directory',
	errorHandler(async (req, res) => {
		const totalOfDoctors = await getTotalOfDoctorsInDirectory();
		const totalHospitals = await getTotalOfHospitalsInDirectory();
		const totalMunicipalities = await getTotalOfMunicipalitiesInDirectory();

		const totalDoctorsGroupedInSpecialties =
			await getTotalOfDoctorsGroupedBySpecialty();
		const doctorsGroupedInSpecialtiesWithSpecialtyNames =
			addSpecialtyNamesToSpecialties(totalDoctorsGroupedInSpecialties);

		const municipalitiesWithHospitals =
			await getMunicipalitiesNestedWithHospitals();
		const municipalitiesWithHospitalCount =
			calculateMunicipalityHospitalCount(municipalitiesWithHospitals);

		await res.status(200).send({ data: municipalitiesWithHospitalCount });
	})
);

module.exports = router;
