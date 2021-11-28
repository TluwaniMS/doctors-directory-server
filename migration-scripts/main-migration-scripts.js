const { createSampleDoctors } = require('./doctor-migration-scripts');
const { createSampleHospitals } = require('./hospitals-migration-scripts');
const { createSampleMunicipalities } = require('./municipalities-migration-scripts');
const { creatSampleSpecialisations } = require('./specialisations-migration-scripts');
const { Doctor } = require('../models/doctor');

async function runMigrationScripts() {
	const doctors = await Doctor.findAll();

	doctors.length > 0 ? console.log(`database is already populated...`) : await populateDatabase();
}

async function populateDatabase() {
	console.log(`Initiating process to populate database...`);

	Promise.all([
		creatSampleSpecialisations(),
		createSampleMunicipalities(),
		createSampleHospitals(),
		createSampleDoctors()
	])
		.then(() => {
			console.log(`Database has been populated successfully... :)!`);
		})
		.catch((error) => {
			console.log(`Problem populating database: ${error.message}`);
		});
}

module.exports = { runMigrationScripts };
