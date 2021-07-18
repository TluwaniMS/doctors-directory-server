const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');

router.get(
	'/get-all-hospitals',
	errorHandler(async (req, res) => {})
);

router.get(
	'/get-hospital/:hospitalId',
	errorHandler(async (req, res) => {})
);

router.put(
	'/update-hospital/:hospitalId',
	errorHandler(async (req, res) => {})
);
module.exports = router;
