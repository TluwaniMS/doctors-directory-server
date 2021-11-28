function extractHospitalKeys(hospitals) {
	const hospitalKeys = hospitals.map((hospital) => hospital.hospitalKey);

	return hospitalKeys;
}

function formatBasicStatsForHospitalsOnMunicipalView(hospitals, doctors) {
	const hospitalsWithBasicStats = [];

	hospitals.forEach((hospital) => {
		const doctorsLinkedToHospital = doctors.filter((doctor) => doctor.hospital === hospital.hospitalKey);
		hospital.totalDoctors = doctorsLinkedToHospital.length;

		hospitalsWithBasicStats.push(hospital);
	});

	return hospitalsWithBasicStats;
}

module.exports = {
	extractHospitalKeys,
	formatBasicStatsForHospitalsOnMunicipalView
};
