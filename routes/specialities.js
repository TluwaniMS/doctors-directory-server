const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');

router.get(
	'/get-all-specialties',
	errorHandler(async (req, res) => {})
);

router.get(
	'/get-specialty/:specialtyId',
	errorHandler(async (req, res) => {})
);

router.put(
	'/update-specialty/:specialtyId',
	errorHandler(async (req, res) => {})
);
module.exports = router;
