const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middleware/error-handler');

router.get(
	'/get-municipalities',
	errorHandler(async (req, res) => {})
);

router.get(
	'/get-municipality/:municipalityId',
	errorHandler(async (req, res) => {})
);

router.post(
	'/update-municipality/:municipalityId',
	errorHandler(async (req, res) => {})
);
module.exports = router;
