// routes/testResults.js
const express = require('express');
const router = express.Router();
const TestResult = require('../models/TestResult');

// Save a test result
router.post('/', async (req, res) => {
  try {
    const { userId, testType, result } = req.body;

    if (!userId || !testType || !result) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newTest = new TestResult({ userId, testType, result });
    await newTest.save();

    res.status(201).json(newTest);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch all test results for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const tests = await TestResult.find({ userId }).sort({ createdAt: -1 });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
