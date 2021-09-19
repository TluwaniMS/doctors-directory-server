function extractHospitalKeys(hospitals) {
	const hospitalKeys = hospitals.map((hospital) => hospital.hospitalKey);

	return hospitalKeys;
}

module.exports = { extractHospitalKeys };
