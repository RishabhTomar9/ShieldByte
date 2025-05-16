// src/utils/api.js

export const saveTestResult = async (userId, testType, result) => {
  try {
    const response = await fetch('/api/test-results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, testType, result }),
    });
    if (!response.ok) throw new Error('Failed to save test result');
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchTestHistory = async (userId) => {
  try {
    const response = await fetch(`/api/test-results/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch test history');
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};
