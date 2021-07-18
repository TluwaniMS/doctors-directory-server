const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');

router.post(
	'/sign-in',
	errorHandler(async (req, res) => {})
);

router.post(
	'/register-user',
	errorHandler(async (req, res) => {})
);

router.put(
	'/reset-user-password',
	errorHandler(async (req, res) => {})
);

module.exports = router;
