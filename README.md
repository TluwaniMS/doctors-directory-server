# doctors-directory-server

# About Repository:
This is a basic node-js project that I created to learn how to connect node-js to an SQL database(Postrgres)

# Software(s) required:
* Latest stable version of Node Package Manager
* Postgres Database

# Project Setup:
## NB!
Please make sure you have a running instance of Postgres.

* Step 1:

Switch to the projects root directory and run `npm install` to install the required packages.

* Step 2:

In the projects root directory create a `.env` file and add the following variables:

`PORT`

`SALT_ROUNDS`

`DB_PASSWORD`

`DB_USERNAME`

* Step 3:

Run `npm  run dev` to start-up the server and access the end-points on `http://localhost:PORT/api/`.


# Dependencies:
* CORS
* DOTENV
* EXPRESS
* BCRYPT
* JSONWEBTOKEN
* MORGAN
* PG
* PG-HSTORE
* SEQUELIZE
* HELMET

# Dev-dependencies:
* NODEMON
* PRETTIER
