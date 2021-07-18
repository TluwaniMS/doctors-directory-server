const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');

router.get(
	'/get-all-doctors',
	errorHandler(async (req, res) => {})
);

router.get(
	'/get-doctor/:doctorId',
	errorHandler(async (req, res) => {})
);

router.put(
	'/update-doctor/:doctorId',
	errorHandler(async (req, res) => {})
);
module.exports = router;
