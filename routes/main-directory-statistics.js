const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');
const {
	getTotalOfDoctorsInDirectory,
	getTotalOfHospitalsInDirectory
} = require('../database-services/main-directory-stats-service');

router.get(
	'/get-total-doctors-in-directory',
	errorHandler(async (req, res) => {
		const totalOfDoctors = await getTotalOfDoctorsInDirectory();
		const totalHospitals = await getTotalOfHospitalsInDirectory();

		await res.status(200).send({ data: totalHospitals });
	})
);

module.exports = router;
