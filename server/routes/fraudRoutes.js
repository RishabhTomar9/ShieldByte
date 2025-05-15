const express = require('express');
const router = express.Router();
const fraudController = require('../controllers/fraudController');

router.post('/transaction', fraudController.addTransaction);
router.get('/transactions', fraudController.getTransactions);

module.exports = router;
