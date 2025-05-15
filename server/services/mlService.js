const axios = require('axios')

exports.predictRisk = async (userData) => {
  const response = await axios.post(process.env.PYTHON_SERVICE_URL, userData)
  return response.data // e.g., { riskScore: 0.85, details: 'Unusual IP' }
}
