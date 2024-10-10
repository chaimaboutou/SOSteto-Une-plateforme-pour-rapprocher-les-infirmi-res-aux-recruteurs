const express = require('express');
const SoinController = require('../controllers/soinController');

const router = express.Router();

// Define the route
router.get('/api/soins', SoinController.getSoins);

module.exports = router;
