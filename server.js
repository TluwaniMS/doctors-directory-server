const { app } = require('./app');
const { port } = require('./config-keys/config-keys');
const { sequelize } = require('./database-config');

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
