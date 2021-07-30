const { Specialisation } = require('../models/specialisation');
const { specialisations } = require('../sample-data/specialisations');

async function creatSampleSpecialisations() {
	await Specialisation.bulkCreate(specialisations);
}

module.exports = { creatSampleSpecialisations };
