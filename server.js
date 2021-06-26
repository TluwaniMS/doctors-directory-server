const {app} = require('./app')
const {port} = require('./config-keys/config-keys')

app.listen(port, () => {
    console.log(`server is running on PORT :${port}... :)`);
  });