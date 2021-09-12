const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');

router.post(
	'/sign-in',
	errorHandler(async (req, res) => {
		res.status(200).send({});
	})
);

router.post(
	'/register-user',
	errorHandler(async (req, res) => {
		res.status(200).send({});
	})
);

router.put(
	'/reset-user-password',
	errorHandler(async (req, res) => {
		res.status(200).send({});
	})
);

module.exports = router;
