const { getAllDoctors } = require('../database-services/doctors-service');
const { getAllHospitals } = require('../database-services/hospitals-service');
const {
	getAllSpecialties
} = require('../database-services/specialties-service');

async function calculateBasicDirectoryStatsForMunicipalView() {
	const doctors = await getAllDoctors();
	const hospitals = await getAllHospitals();
	const specialties = await getAllSpecialties();

	const totalDoctors = doctors.length;
	const totalHospitals = hospitals.length;
	const totalSpecialties = specialties.length;

	const basicStats = structureBasicDirectoryStats(
		totalDoctors,
		totalHospitals,
		totalSpecialties
	);

	return basicStats;
}

function structureBasicDirectoryStats(
	totalDoctors,
	totalHospitals,
	totalSpecialties
) {
	const basicStats = {
		totalDoctors,
		totalHospitals,
		totalSpecialties
	};

	return basicStats;
}
module.exports = { calculateBasicDirectoryStatsForMunicipalView };
