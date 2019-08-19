const { authSecret } = require('../.env')

const auth = token => {
  return token === authSecret
}

const errorInvalidKey = req => {
  return { header: req.headers, err: 'API key access master is invalid' }
}

const invalidDataReceived = () => {
  return { msg: 'Invalid data received', error: true }
}

module.exports = { auth, errorInvalidKey, invalidDataReceived }
