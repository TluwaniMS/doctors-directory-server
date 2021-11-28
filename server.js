const dotenv = require('dotenv').config();
const { app } = require('./app');
const { port } = require('./config-keys/config-keys');
const { sequelize } = require('./database-config');
const { runMigrationScripts } = require('./migration-scripts/main-migration-scripts');

app.listen(port, () => {
	console.log(`server is running on PORT :${port}... :)`);
});

sequelize
	.authenticate()
	.then(() => {
		console.log(`connection successfully established :)...`);
	})
	.catch((error) => {
		`connection was unsuccessful :( ${error.message}`;
	});

(async () => {
	await sequelize.sync();
	await runMigrationScripts();
})();
